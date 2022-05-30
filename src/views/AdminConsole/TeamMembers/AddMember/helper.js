export const findSelectAllInData = (value, Name = "Name") => {
  let DataWithOnlyName = [];
  for (let i = 0; i < value.length; i++) {
    DataWithOnlyName.push(value[i]?.[Name]);
  }
  const Flag = DataWithOnlyName.includes("Select All");
  return Flag;
};
export const ValidateEmail = (str) => {
  var lastAtPos = str.lastIndexOf("@");
  var lastDotPos = str.lastIndexOf(".");
  return (
    lastAtPos < lastDotPos &&
    lastAtPos > 0 &&
    str.indexOf("@@") === -1 &&
    lastDotPos > 2 &&
    str.length - lastDotPos > 2
  );
};
export const isNumeric = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
export const ISTtoCST = (intialvalue) => {
  // let dateandtimestring = new Date().toString().split("(");
  let dateandtimestring= intialvalue?new Date(intialvalue).toString().split("("):
    new Date().toString().split("(");
  if (dateandtimestring[1].includes("India")) {
    let timelagging = 11.53;
    let indianTime = new Date();
    let centralTime = new Date(
      indianTime.getTime() - 1 * 60 * 60 * 1000 * timelagging
    );
    return centralTime;
    // Found world
  }
  let centralTime = new Date();
  return centralTime;
};
export const getCheckedFlag = (option, selectedarray, key) => {
  let FieldData = option?.[`${key}`];
  let flag = false;
  for (let i = 0; i < selectedarray.length; i++) {
    if (selectedarray[i]?.[`${key}`] === FieldData) {
      flag = true;
    }
  }
  return flag;
};
export const convert=(str)=> {
  // var date = new Date(str),
  // let date=ISTtoCST(str),
  let date=new Date(new Date(str).toLocaleString('en-US', { timeZone: 'America/Chicago' })),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("/");
}

export const LatestTime=()=>{
  // let date = new Date();
  // let date = ISTtoCST();
  let date = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }));

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = { HOUR: hours, MINUTES: minutes, AMPM: ampm };
  return strTime;
}
// const validateForm = () => {
//   if (
//     !formData ||
//     !formData.impStandard ||
//     formData.impStandard.trim() === ""
//   ) {
//     if (isNaN(formData.impStandard) || formData.impStandard.length != 9) {
//     }
//   }
// };
export const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
export const CurrentTime=(num)=> {
  if (num < 10) {
    let stre = num.toString();
    let OutNum = Number(stre.replace(/^0*(.+)/, "$1"));
    return OutNum;
  } else {
    return num;
  }
}
export const convertArra2string = (array) => {
  const newarra = [];
  for (let i = 0; i < array.length; i++) {
    newarra.push(array[i].Id);
  }
  const newvalue = newarra.toString();

  return newvalue;
};
export const convertTimeAndHours = (timeAP, timeHH, timeMM) => {
  let format = timeAP === 1 ? "AM" : "PM";
  let vals = [
    timeHH < 10 ? `0${timeHH}` : timeHH,
    timeMM < 10 ? `0${timeMM}` : timeMM,
  ].join(":");
  let newValue = vals + " " + format;
  return newValue;
};

export const allLetter=(inputtxt)=> {
  let letters = /^[a-zA-Z\s]*$/;

  if (inputtxt.value.match(letters)) {
    return true;
  } else {
    return false;
  }
}

export const convertDate=(str)=> {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2),
    year = date.getFullYear();
  return [mnth, day, year];
}
export const alphanumeric=(inputtxt)=> {
  let letterNumber = /^[0-9a-zA-Z\s]*$/;

  if (inputtxt.value.match(letterNumber)) {
    return true;
  }
  return false;
}


// const onDeletePrimarySkillsChips = (Id) => () => {
  //   const updatedData =
  //     primarySkills && primarySkills.filter((p) => p.Id !== Id);
  //   setSelectedPrimarySkills(updatedData);
  // };

  // const onDeleteSecondarySkillsChips = (Id) => () => {
  //   const updatedData =
  //     secondarySkills && secondarySkills.filter((p) => p.Id !== Id);
  //   setSelectedSecondarySkills(updatedData);
  // };
