# debug_metadata.py
import importlib, sys, os, pkgutil

# ensure project root is on sys.path
sys.path.insert(0, os.getcwd())

# import the project's Base (from app.db.base)
try:
    from app.db.base import Base
    print("Imported Base from app.db.base")
except Exception as e:
    print("ERROR importing Base from app.db.base:", repr(e))
    raise

# import all model modules under app/models
models_dir = os.path.join(os.path.dirname(__file__), "app", "models")
if os.path.isdir(models_dir):
    for finder, name, ispkg in pkgutil.iter_modules([models_dir]):
        print("importing app.models."+name)
        try:
            importlib.import_module("app.models."+name)
        except Exception as e:
            print("FAILED to import app.models."+name, "->", repr(e))
            raise
else:
    print("app/models directory not found:", models_dir)

print("Registered tables:", list(Base.metadata.tables.keys()))
