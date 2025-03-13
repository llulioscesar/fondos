import logging

logger = logging.getLogger("BTG")

def send_notification(fund: str, action: str, medium: str = "email"):
    logger.info(f"Notification sent via {medium}: {action} for fund {fund}")