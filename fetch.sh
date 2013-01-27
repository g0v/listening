#!/bin/sh

curl "http://socbu.kcg.gov.tw/?prog=1&b_id=5" > data/kcg-raw.list
grep prog=2 data/kcg-raw.list > data/kcg.list
