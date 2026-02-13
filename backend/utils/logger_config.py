import logging
import json
import datetime

class JsonFormatter(logging.Formatter):
    def format(self, record):
        log_obj = {
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "funcName": record.funcName
        }
        if record.exc_info:
            log_obj["exc_info"] = self.formatException(record.exc_info)
        return json.dumps(log_obj)

def setup_logging():
    logger = logging.getLogger("spaceguard")
    logger.setLevel(logging.INFO)
    
    handler = logging.StreamHandler()
    handler.setFormatter(JsonFormatter())
    
    if not logger.handlers:
        logger.addHandler(handler)
    
    return logger

logger = setup_logging()
