from app import create_app
from models.database import db
from models.colorPalette import ColorPalette

def init_db():
    app = create_app(db)
    with app.app_context():
        db.create_all()
        db.session.add(ColorPalette('summer', '#95c4a2'))
        db.session.commit()

if __name__ == '__main__':
    init_db()