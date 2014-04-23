QUERY_START="SELECT DISTINCT first, last, CASE city WHEN '' THEN county ELSE city END area, CASE birth WHEN '' THEN 60 ELSE 2014 - SUBSTR(birth, 7) END age FROM cd2 WHERE id IN (SELECT voter FROM"
QUERY_END="ORDER BY last, first, area, age"

# create table likely_midterm_primary AS SELECT voter from h2 WHERE event LIKE
# '06%2010' OR event LIKE '08%2006' GROUP BY voter HAVING COUNT(1) = 2;
FILE=likely_midterm_primary_democrat
sqlite3 data.sqlite "$QUERY_START likely_midterm_primary) AND party = 'Democrat' $QUERY_END" > $FILE.txt
node clean.js $FILE.txt > ${FILE}_clean.txt
node anonymize.js ${FILE}_clean.txt > ${FILE}_anon.txt
node toJson.js ${FILE}_anon.txt > ${FILE}_anon.js
exit

FILE=likely_midterm_primary_republican
sqlite3 data.sqlite "$QUERY_START likely_midterm_primary) AND party = 'Republican' $QUERY_END" > $FILE.txt
node clean.js $FILE.txt > ${FILE}_clean.txt

# create table likely_midterm_general AS SELECT voter from h2 WHERE event LIKE
# '11%2010' OR event LIKE '11%2006' GROUP BY voter HAVING COUNT(1) = 2;
FILE=likely_midterm_general_not_democrat
sqlite3 data.sqlite "$QUERY_START likely_midterm_general) AND party != 'Democrat' $QUERY_END" > $FILE.txt
node clean.js $FILE.txt > ${FILE}_clean.txt
FILE=likely_midterm_general_non_partisan
sqlite3 data.sqlite "$QUERY_START likely_midterm_general) AND party = 'Non-Partisan' $QUERY_END" > $FILE.txt
node clean.js $FILE.txt > ${FILE}_clean.txt
