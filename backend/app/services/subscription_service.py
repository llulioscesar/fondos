from datetime import datetime
from app.exceptions.custom_exceptions import FundNotFoundException, InsufficientAmountException, \
    InsufficientBalanceException
from app.models.transaction import Transaction
from app.repositories.config_repository import ConfigRepository
from app.repositories.transactions_repository import TransactionRepository
from app.services.fund_service import FundService
from app.services.notifications import send_notification


class SubscriptionService:
    def __init__(self):
        self.config_repository = ConfigRepository()
        self.fund_service = FundService()
        self._funds_cache = None
        self.repository = TransactionRepository()

    async def load_funds(self):
        self._funds_cache = await self.fund_service.get_all_funds()

    def validate_subscription(self, fund_name: str, amount: float):
        if self._funds_cache is None:
            raise FundNotFoundException(fund_name)

        fund_info = next((f for f in self._funds_cache if f.name == fund_name), None)
        if not fund_info:
            raise FundNotFoundException(fund_name)
        if amount < fund_info.min_amount:
            raise InsufficientAmountException(fund_name)

    async def get_all_subscriptions(self) -> list[Transaction]:
        subscriptions = await self.repository.get_all_transactions()
        return subscriptions

    async def create_subscription(self, fund_name: str, amount: float, email: str) -> Transaction:
        if self._funds_cache is None:
            await self.load_funds()

        self.validate_subscription(fund_name, amount)

        config = await self.config_repository.get_config()
        current_balance = config["balance"]

        if current_balance < amount:
            raise InsufficientBalanceException(fund_name)

        new_balance = current_balance - amount
        await self.config_repository.update_balance(new_balance)

        transaction = Transaction(
            fund=fund_name,
            type="subscribe",
            amount=amount,
            date=datetime.now(),
            email=email
        )

        print('sidhhsj')

        transaction = await self.repository.create_transaction(transaction)

        print('oooooooo')

        send_notification(fund_name, "subscribe", email)

        return transaction

    async def cancel_subscription(self, transaction_id: str) -> Transaction:
        original_tx = await self.repository.get_transaction(transaction_id)
        if not original_tx:
            raise FundNotFoundException(f"Transaction with id {transaction_id} not found")

        if original_tx.type != "subscribe":
            raise ValueError("Only subscriptions can be canceled")


        config = await self.config_repository.get_config()
        current_balance = config["balance"]

        new_balance = current_balance + original_tx.amount
        await self.config_repository.update_balance(new_balance)

        cancel_tx = Transaction(
            fund=original_tx.fund,
            type="cancel",
            amount=original_tx.amount,
            date=datetime.now(),
            email=original_tx.email
        )

        transaction = await self.repository.create_transaction(cancel_tx)

        send_notification(original_tx.fund, "cancel", original_tx.email)

        return transaction
