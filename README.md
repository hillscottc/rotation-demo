# Ad Rotation Demo

## Description

Write a program in the language of your choosing that:

* Consumes both `rotations.csv` and `spots.csv`
* Generates output that shows cost per view by two dimensions:
  * CPV by creative
  * CPV by rotation by day

```sh
# rotations.csv
"Start","End","Name"
"6:00 AM","12:00 PM","Morning"
"12:00 PM","4:00 PM","Afternoon"
"3:00 PM","8:00 PM","Prime"

# spots.csv
"Date","Time","Creative","Spend","Views"
"01/02/2016","8:30 AM","TEST001H",120.50,100
"01/02/2016","11:30 AM","TEST001H",240.50,110
"01/02/2016","3:30 PM","TEST002H",500,80
"01/02/2016","3:34 PM","TEST002H",400,90
"01/02/2016","3:40 PM","TEST001H",400,110
"02/02/2016","7:30 AM","TEST001H",700,200
"02/02/2016","7:30 PM","TEST002H",700,300
```

### Details

* "Creative" - Business lingo for a TV ad
* "Rotation" - The timerange on a TV network that an ad airs in
