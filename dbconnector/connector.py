'''
Created on 09 Kas 2022

@author: batuhanka
'''
import psycopg
import sys

class Postgresql:

    def __init__(self, host, port, db, user, passwd):
        self.host = host
        self.port = port
        self.db = db
        self.user = user
        self.passwd = passwd
        self.conn_string = self.set_conn_string()

    def set_conn_string(self):
        return "host='%s' port='%s' dbname='%s' user='%s' password='%s'" % (self.host, self.port, self.db, self.user, self.passwd)

    def connection(self):
        try:
            self.conn = psycopg.connect(self.conn_string)
            self.conn.autocommit = True
            return self.conn.cursor()
        except:
            print("Database connection failed!\n ->%s" % (sys.exc_info()[1]))
            raise Exception('Database connection failed!')

    def connection_transactional(self):
        try:
            self.conn = psycopg.connect(self.conn_string)
            self.conn.autocommit = False
            return self.conn, self.conn.cursor()
        except:
            print("Database connection failed!\n ->%s" % (sys.exc_info()[1]))
            raise Exception('Database connection failed!')

    def connection_simple(self):
        try:
            self.conn = psycopg.connect(self.conn_string)
            self.conn.autocommit = False
            return self.conn
        except:
            print("Database connection failed!\n ->%s" % (sys.exc_info()[1]))
            raise Exception('Database connection failed!')

    def close(self):
        self.conn.close()

    def getDB(self):
        return self.db


class Query:
    def __init__(self, cursor):
        self.cursor = cursor

    def run(self, query):
        try:
            self.cursor.execute(query)
            return self.cursor.fetchall()
        except psycopg.Error as e:
            print(e.pgerror)
            raise Exception(e.pgerror)
        except:
            raise (sys.exc_info()[1])

    def insert(self, query):
        try:
            self.cursor.execute(query)
            return "SUCCESS"
        except psycopg.Error as e:
            print(e.pgerror)
            raise Exception(e.pgerror)
            

    def update(self, query):
        try:
            self.cursor.execute(query)
            return "SUCCESS"
        except:
            raise (sys.exc_info()[1])

    def notice(self, query):
        try:
            self.cursor.execute(query)
            return "SUCCESS"
        except psycopg.Error as e:
            return e.pgerror
        except:
            print("sys exc info : ",sys.exc_info()[1])

    def call(self, query):
        try:
            self.cursor.execute(query)
            return "SUCCESS"
        except psycopg.Error as e:
            print(e.pgerror)
            raise Exception(e.pgerror)
        except:
            raise (sys.exc_info()[1])

    def run_params(self, query, params):
        try:
            self.cursor.execute(query, params)
            return self.cursor.fetchall()
        except psycopg.Error as e:
            print(e.pgerror)
            raise Exception(e.pgerror)
        except:
            raise (sys.exc_info()[1])

    def insert_params(self, query, params):
        try:
            self.cursor.execute(query, params)
            return "SUCCESS"
        except psycopg.Error as e:
            print(e.pgerror)
            raise Exception(e.pgerror)
        except:
            raise (sys.exc_info()[1])

    def insert_params_returning(self, query, params):
        try:
            self.cursor.execute(query, params)
            return self.cursor.fetchall()
        except psycopg.Error as e:
            print(e.pgerror)
            raise Exception(e.pgerror)
        except:
            raise (sys.exc_info()[1])

    def update_params(self, query, params):
        try:
            self.cursor.execute(query, params)
            return "SUCCESS"
        except psycopg.Error as e:
            print(e.pgerror)
            raise Exception(e.pgerror)
        except:
            raise (sys.exc_info()[1])


