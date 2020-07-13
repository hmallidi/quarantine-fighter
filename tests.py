import sys
import unittest
import os
import googlemaps
import json
import time
import usaddress
import requests

from unittest import main, TestCase
from models import db, app, City, Hospital, Drugstore, drugstore_hospital_link
from flask import Flask, session, render_template, request, url_for, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import text


class DBTestCases(TestCase):
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

    def test_city_4(self):
        r4 = db.session.query(City).filter_by(id = '6').all()
        self.assertEqual(r4[0].name, 'Phoenix')

    def test_city_5(self):
        r5 = db.session.query(City).filter_by(name = 'Dallas').all()
        self.assertEqual(r5[0].state, 'TX')

    def test_city_6(self):
        r6 = db.session.query(City).filter_by(name = 'Minneapolis').all()
        self.assertEqual(len(r6), 0)
        
    def test_city_7(self):
        r7 = db.session.query(City).filter_by(name = 'Houston').all()
        self.assertEqual(r7[0].state, 'TX')
        
    def test_city_8(self):
        r8 = db.session.query(City).filter_by(id = '10').all()
        self.assertEqual(r8[0].name, 'San Jose')
        
    def test_city_9(self):
        #shouldn't be in the database
        r9 = db.session.query(City).filter_by(name = 'Washington DC').all()
        self.assertEqual(len(r9), 0)
        
    def test_city_10(self):
        r10 = db.session.query(City).filter_by(name = 'San Francisco').all()
        self.assertEqual(r10[0].state, 'CA')
        
    
    
    def test_hospital_1(self):
        r = db.session.query(Hospital).filter_by(id = 'ChIJpYoZlyJawokRv65psH6e2pI').all()
        self.assertEqual(r[0].name, 'NewYork-Presbyterian Lower Manhattan Hospital')

    def test_hospital_2(self):
        r = db.session.query(Hospital).filter_by(zipcode = '10025').all()
        self.assertEqual(r[0].name, 'St Lukes Hospital')

    def test_hospital_3(self):
        r = db.session.query(Hospital).filter_by(city_id = 3).all()
        self.assertLessEqual(len(r), 60)

    def test_hospital_4(self):
        r = db.session.query(Hospital).filter_by(name = 'Paradise').all()
        self.assertLessEqual(len(r), 0)

    def test_drugstore_1(self):
        r = db.session.query(Drugstore).filter_by(id = 'ChIJT5aLX5tZwokRFuz5h0KWsEo').all()
        self.assertEqual(r[0].name, 'Block Drug Store')

    def test_drugstore_2(self):
        r = db.session.query(Drugstore).filter_by(zipcode = '60657').all()
        self.assertEqual(r[0].name, 'Walgreens')

    def test_drugstore_3(self):
        r = db.session.query(Drugstore).filter_by(city_id = 5).all()
        self.assertEqual(r[0].name, 'Rite Aid')

    def test_drugstore_4(self):
        r = db.session.query(Drugstore).filter_by(city_id = 11).all()
        self.assertEqual(len(r), 59)



if __name__ == '__main__':
    main()
