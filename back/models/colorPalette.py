from models.database import db

class ColorPalette(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    color = db.Column(db.String(8), nullable=False)

    def __init__(self, name, color):
        self.name = name
        self.color = color

    def __repr__(self):
        return f'<ColorPalette {self.name}>'