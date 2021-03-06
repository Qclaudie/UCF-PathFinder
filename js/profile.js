// Profile

// All functions for profile tab
// Also holds the functions that deal with switching Term or Year on Schedule Page

function changeTerm() {

  var term = document.getElementById("profileTerm").value;
  var year = document.getElementById("profileYear").value;

  if(term == "Term" || year == "Year")
  {
    $("#changeCheck").modal();
    return;
  }

  document.getElementById("termYear").innerHTML= term + " " + year;

  document.getElementById("classes").innerHTML = "";
  document.getElementById("myUL").innerHTML = "";
  scheduleList = [];

  document.getElementById("term").value = document.getElementById("profileTerm").value;
    document.getElementById("year").value = document.getElementById("profileYear").value;
    document.getElementById("term").selectedIndex = findSemesterIndex(term, 'term');
    document.getElementById("year").selectedIndex = findSemesterIndex(year, 'year');

  var jsonPayload = '{"userID" : "'+ userId +'", "term" : "'+ term +'", "year" : "'+ year +'"}';
  var url = urlBase + '/GetSchedule.' + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, false);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try
  {
    xhr.send(jsonPayload);

    var jsonObject = JSON.parse( xhr.responseText );

    //document.getElementById("userName").innerHTML = firstName + " " + lastName;
    for(i = 0; i < jsonObject.schedule.length; i++)
    {
      var course = new Course();

      course.classID = jsonObject.schedule[i][0];
      course.buildingID = jsonObject.schedule[i][1];
      course.className = jsonObject.schedule[i][2];
      course.startTime = jsonObject.schedule[i][3];
      course.endTime = jsonObject.schedule[i][4];
      course.classCode = jsonObject.schedule[i][5];
      course.term = jsonObject.schedule[i][6];
      course.year = jsonObject.schedule[i][7];
      course.notes = jsonObject.schedule[i][8];
      course.classDays = jsonObject.schedule[i][9];
      course.building = jsonObject.schedule[i][10];

      scheduleList.push(course);

      addtoList(course);

      if(scheduleList.length < 1)
        document.getElementById("delSch").style.display = 'none';
    }

    for(j = 0; j < scheduleList.length; j++)
    {
      makeTile(scheduleList[j]);
    }

  }
  catch(err)
  {
    // make new error message
    // document.getElementById("loginResult").innerHTML = err.message;
  }
}

function findSemesterIndex(value, type) {
  for(i = 0; i < document.getElementById(type).options.length; i++)
    if(document.getElementById(type).options[i].value == value)
      return i;
}

function popUp(elementId) {
  if(document.getElementById("term").value != "Term" && document.getElementById("year").value != "Year" && gTerm != "" && gYear!= "")
    $("#" + elementId + "Check").modal();
}

function change() {

  document.getElementById("profileTerm").value = document.getElementById("term").value;
  document.getElementById("profileYear").value = document.getElementById("year").value;
  changeTerm();

  if(document.getElementById("profileTerm").value == document.getElementById("term").value)
    gYear = document.getElementById("year").value;
  else
    gTerm = document.getElementById("term").value;
}

function resume() {
  document.getElementById("term").value = gTerm;
  document.getElementById("year").value = gYear;
}
