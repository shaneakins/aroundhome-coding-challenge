export const sortByAscending = arr => arr.slice().sort((a, b) => b - a);

export const getDay = dateString => {
  const weekdays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  const day = new Date(dateString).getDay();
  return weekdays[day];
};

export const groupBy = (arr, criteria) => {
  return arr.reduce(function (obj, item) {
    // Check if the criteria is a function to run on the item or a property of it
    let key = typeof criteria === 'function' ? criteria(item) : item[criteria];

    // If the key doesn't exist yet, create it
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      obj[key] = [];
    }

    // Push the value to the object
    obj[key].push(item);

    // Return the object to the next item in the loop
    return obj;
  }, {});
};

export const formatTime = dateString => {
  // const options = { year: "numeric", month: "long", day: "numeric" }
  const options = { hour: 'numeric', minute: 'numeric' };
  return new Date(dateString).toLocaleTimeString('de-DE', options);
};
