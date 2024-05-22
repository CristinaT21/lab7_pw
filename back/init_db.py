from app import create_app
from models.database import db
from models.colorPalette import ColorPalette

def init_db():
    app = create_app(db)
    with app.app_context():
        db.create_all()
        db.session.add(ColorPalette('summer', '#95c4a2'))
        db.session.add(ColorPalette('fall', '#f9a875'))
        db.session.add(ColorPalette('winter', '#9dbad5'))
        db.session.add(ColorPalette('spring', '#f2e0a4'))
        db.session.add(ColorPalette('pink', '#ed9fba'))
        db.session.add(ColorPalette('blue', '#99acc9'))
        db.session.add(ColorPalette('baby_blue', '#9fbeed'))
        db.session.add(ColorPalette('green', '#9dbad5'))
        db.session.add(ColorPalette('purple', '#purple'))
        db.session.add(ColorPalette('yellow', '#f9f586'))
        db.session.add(ColorPalette('orange', '#f9a875'))

        db.session.commit()

if __name__ == '__main__':
    init_db()