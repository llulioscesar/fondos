from fastapi import Request
from fastapi.responses import JSONResponse


class FundNotFoundException(Exception):
    def __init__(self, fund: str):
        self.fund = fund

class InsufficientAmountException(Exception):
    def __init__(self, fund: str):
        self.fund = fund

class InsufficientBalanceException(Exception):
    def __init__(self, fund: str):
        self.fund = fund

def fund_not_found_handler(request: Request, exc: FundNotFoundException):
    return JSONResponse(status_code=404, content={"detail": f"Fund {exc.fund} not found"})

def insufficient_amount_handler(request: Request, exc: InsufficientAmountException):
    return JSONResponse(
        status_code=400,
        content={"detail": f"No tiene saldo disponible para vincularse al fondo {exc.fund}"}
    )

def insufficient_balance_handler(request: Request, exc: InsufficientBalanceException):
    return JSONResponse(
        status_code=400,
        content={"detail": f"No tiene saldo disponible para vincularse al fondo {exc.fund}"}
    )

def register_exception_handlers(app):
    app.add_exception_handler(FundNotFoundException, fund_not_found_handler)
    app.add_exception_handler(InsufficientAmountException, insufficient_amount_handler)
    app.add_exception_handler(InsufficientBalanceException, insufficient_balance_handler)