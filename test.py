import sys
import unittest
import os
import googlemaps
import json
import time
import usaddress
import requests

from models import db, app, City, Hospital, Drugstore, drugstore_hospital_link
from flask import Flask, session, render_template, request, url_for, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import text

class DBTestCases(unittest.TestCase):
    def test_city_1(self):
        r = db.session.query(City).filter_by(id = '3').all()
        self.assertEqual(r[0].name, 'Chicago')

    def test_city_2(self):
        r2 = db.session.query(City).filter_by(name = 'New York').all()
        self.assertEqual(r2[0].state, 'NY')

    def test_city_3(self):
        #shouldn't be in the database
        r3 = db.session.query(City).filter_by(name = 'Toronto').all()
        self.assertEqual(len(r3), 0)

    def test_hospital_1(self):
        r = db.session.query(Hospital).filter_by(id = 'ChIJpYoZlyJawokRv65psH6e2pI').all()
        self.assertEqual(r[0].name, 'NewYork-Presbyterian Lower Manhattan Hospital')

    def test_hospital_2(self):
        r = db.session.query(Hospital).filter_by(zipcode = '10025').all()
        self.assertEqual(r[0].name, 'St Lukes Hospital')

    def test_hospital_3(self):
        r = db.session.query(Hospital).filter_by(city_id = 3).all()
        self.assertLessEqual(len(r), 60);

    def test_drugstore_1(self):
        r = db.session.query(Drugstore).filter_by(id = 'ChIJT5aLX5tZwokRFuz5h0KWsEo').all()
        self.assertEqual(r[0].name, 'Block Drug Store')

    def test_drugstore_2(self):
        r = db.session.query(Drugstore).filter_by(zipcode = '60657').all()
        self.assertEqual(r[0].name, 'Walgreens')

    def test_drugstore_3(self):
        r = db.session.query(Drugstore).filter_by(city_id = 5).all()
        self.assertEqual(r[0].name, 'Rite Aid')


if __name__ == '__main__':
    unittest.main()
