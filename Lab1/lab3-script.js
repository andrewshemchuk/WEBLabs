import { randomUserMock } from "./FE4U-Lab3-mock.js";
import { additionalUsers } from "./FE4U-Lab3-mock.js";


function task1(){
    let courses = [ "Mathematics",      "Physics",      "English",
                    "Computer Science", "Dancing",      "Chess",
                    "Biology",          "Chemistry",    "Law", 
                    "Art",              "Medicine",     "Statistics" ];
    
    let users = [];

    let id = 0;
    randomUserMock.forEach((currentUser) => {
        let user = {};

        user["id"]                  = id++;
        user["favorite"]            = false;
        user["course"]              = courses[Math.floor(Math.random() * courses.length)];
        user["bg_color"]            = "#FFFFFF";
        user["note"]                = "Lorem Ipsum ..."

        user["sex"]                 = currentUser.gender;
        user["title"]               = currentUser.name.title;
        user["full_name"]           = currentUser.name.first.concat(" ", currentUser.name.last);
        user["city"]                = currentUser.location.city;
        user["state"]               = currentUser.location.state;
        user["country"]             = currentUser.location.country;
        user["postcode"]            = currentUser.location.postcode;

        let coordinates = {};
        coordinates["latitude"]     = currentUser.location.coordinates.latitude;
        coordinates["longitude"]    = currentUser.location.coordinates.longitude;

        user["coordinates"]         = coordinates;

        let timezone = {};
        timezone["offset"]          = currentUser.location.timezone.offset;
        timezone["description"]     = currentUser.location.timezone.description;
        
        user["timezone"]            = timezone;

        user["email"]               = currentUser.email;
        user["b_date"]              = currentUser.dob.date;
        user["age"]                 = currentUser.dob.age;
        user["phone"]               = currentUser.phone;
        user["picture_large"]       = currentUser.picture.large;
        user["picture_thumbnail"]   = currentUser.picture.thumbnail;

        let coincidence = additionalUsers.find((addUser) => {
            return user["full_name"] == addUser.full_name;
        });

        if(coincidence != undefined){
            user["id"]              = coincidence.id;
            user["favorite"]        = coincidence.favorite;
            user["course"]          = coincidence.course;
            user["bg_color"]        = coincidence.bg_color;
            user["note"]            = coincidence.note;
        }

        users.push(user); 
    });

    return users;
}

function testUppercase(word){
    if (word == null || word == undefined) return false;

    return /^[A-Z\p{Lu}]/u.test(word);
}

function task2(user){

    let name    = user["full_name"].split(' ')[0];
    let surname = user["full_name"].split(' ')[1];

    let checkName       = testUppercase(name) && testUppercase(surname);
    let checkSex        = testUppercase(user["sex"]);
    let checkNote       = testUppercase(user["note"]);
    let checkState      = testUppercase(user["state"]);
    let checkCity       = testUppercase(user["city"]);
    let checkCountry    = testUppercase(user["country"]);

    if(!checkName || !checkSex || !checkNote || !checkState || !checkCity || !checkCountry){
        return false;
    }

    if(isNaN(user["age"])){
        return false;
    }

    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(!phoneRegex.test(user["phone"])){
        return false;
    }

    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(!emailRegex.test(user["email"])){
        return false;
    }

    return true;
}

function task3(users, country, age, sex, favorite){
    if(!Array.isArray(users)) return undefined;
    
    let filtrated = [];
    users.forEach((user) => {
        let isMatch = user["country"] == country 
                    && user["age"] == age 
                    && user["sex"] == sex 
                    && user["favorite"] == favorite;
        if(isMatch) filtrated.push(user);
    });

    return filtrated;
}

function task4(users, isDescending, fieldName = "full_name"){
    let avalibleFields = ["full_name", "age", "b_date", "country"];

    if(!Array.isArray(users) || !avalibleFields.includes(fieldName)) return undefined;

    let greater = isDescending ? 1 : -1;
    let lesser = isDescending ? -1 : 1;

    let sorted = users.slice();
    sorted.sort((user1, user2) => {
        if(user1[fieldName] > user2[fieldName]){
            return greater;
        }
        if(user1[fieldName] < user2[fieldName]){
            return lesser;
        }
    });

    return sorted;
}

function task5(users, fieldName, value){
    let avalibleFields = ["full_name", "note", "age"];

    if(!Array.isArray(users) || !avalibleFields.includes(fieldName)) return undefined;

    let found = equalsTo(users, fieldName, value);

    return found;
}

//Conditional funcs
function greaterThan(array, fieldName, comparationValue) {
    if(!Array.isArray(array)) return undefined;

    return array.filter((value) => value[fieldName] > comparationValue);
}
function lesserThan(array, fieldName, comparationValue){
    if(!Array.isArray(array)) return undefined;

    return array.filter((value) => value[fieldName] < comparationValue);
}
function equalsTo(array, fieldName, comparationValue){
    if(!Array.isArray(array)) return undefined;

    return array.filter((value) => value[fieldName] == comparationValue);
}
function findAppearance(array, fieldName, possibleAppearance){
    if(!Array.isArray(array)) return undefined;

    return array.filter((value) => value[fieldName].toLowerCase().includes(possibleAppearance.toLowerCase()));
}

function task6(users, fieldName, value, comparator){
    if(!Array.isArray(users)) return undefined;
    let avalibleFields = Object.keys(users[0]);
    if(!avalibleFields.includes(fieldName)) return undefined;

    let filtrated = comparator(users, fieldName, value);

    return filtrated.length / users.length * 100;
}

let allUsers = task1();
console.log(allUsers);

allUsers.forEach((user) => {
    console.log(task2(user));
});

let filtratedUsers = task3(allUsers, "Germany", 65, "male", true);
console.log(filtratedUsers);

let field = "age";
let sorted1 = task4(allUsers, true, field);
sorted1.forEach((user) => {
    console.log(user[field]);
});

console.log();

let sorted2 = task4(allUsers, false, field);
sorted2.forEach((user) => {
    console.log(user[field]);
});

let found = task5(allUsers, "age", 47);
console.log(found);

let percentage = task6(allUsers, "age", 47, equalsTo);
console.log(`Equals to: ${percentage}%`);

percentage = task6(allUsers, "age", 47, greaterThan);
console.log(`Greater than: ${percentage}%`);

percentage = task6(allUsers, "age", 47, lesserThan);
console.log(`Lesser than: ${percentage}%`);

let appearance = "en";
percentage = task6(allUsers, "full_name", appearance, findAppearance);
console.log(`'${appearance}' does appear in user names in: ${percentage}%`);
