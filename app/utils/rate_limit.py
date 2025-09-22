# app/utils/rate_limit.py
import time
from functools import wraps
from fastapi import HTTPException, status, Request

user_requests = {}

def rate_limit(max_requests: int, time_window: int):
    def decorator(func):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            identifier = request.client.host
            current_time = time.time()
            window_start = current_time - time_window
            if identifier in user_requests:
                user_requests[identifier] = [t for t in user_requests[identifier] if t > window_start]
            if identifier in user_requests and len(user_requests[identifier]) >= max_requests:
                raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many requests")
            user_requests.setdefault(identifier, []).append(current_time)
            return await func(request, *args, **kwargs)
        return wrapper
    return decorator
