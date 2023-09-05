const express = require("express");
var mongoose = require("mongoose");
const Upload = require("../middlewares/Upload");
const {
  GetUser,
  CreateUser,
  LoginUser,
  GetUsers,
  DeleteUser,
} = require("../controllers/UsersCtrl");
const AuthenticateUser = require("../middlewares/AuthenticateUser");
const Trucks = require("../models/Trucks");
const Trailers = require("../models/Trailers");
const Users = require("../models/Users");
const Histories = require("../models/Histories");
const Requests = require("../models/Request");
const TruckLists = require("../models/TruckLists");
const TrailerLists = require("../models/TrailerLists");
const Vendors = require("../models/Vendors");
const Shedules = require("../models/Shedules");
var _ = require("lodash");
const Illinoises = require("../models/Illinoises");
const TIllinoises = require("../models/TIllinoises");
const Coloradoses = require("../models/Coloradoses");
const Midwestes = require("../models/Midwestes");
const Calendars = require("../models/Calendars");
const Logics = require("../models/Logics");
const Actionlogs = require("../models/Actionlogs");
const TColoradoses = require("../models/TColoradoses");
const TTrailers = require("../models/TTrailers");
const UtahWeeklyCalendar = require("../models/UtahWeeklyCalendar");
const UtahWeeklyCalendarText = require("../models/UtahWeeklyCalendarText");
const ColoradoWeeklyCalendar = require("../models/ColoradoWeeklyCalendar");
const ColoradoWeeklyCalendarText = require("../models/ColoradoWeeklyCalendarText");
const MidwestWeeklyCalendar = require("../models/MidwestWeeklyCalendar");
const MidwestWeeklyCalendarText = require("../models/MidwestWeeklyCalendarText");
const EastWeeklyCalendar = require("../models/EastWeeklyCalendar");
const EastWeeklyCalendarText = require("../models/EastWeeklyCalendarText");
const { findById } = require("../models/Users");
const ObjectId = mongoose.Types.ObjectId;
const moment= require('moment');

function SocketRouter(io) {
  const router = express.Router();

  const getCurrentWeek = () =>{
    var currentDate = moment();
      var weekStart = currentDate.clone().startOf('isoweek');
      var days = [];
      for (var i = 0; i <= 6; i++) {
          days.push(moment(weekStart).add(i, 'days').format("ddd MMM D Y"));
      }
      return days;
  }

  const getNextWeek = () =>{
    var currentDate = moment();
      var weekStart = currentDate.clone().startOf('isoweek');
      var days = [];
      for (var i = 7; i <= 13; i++) {
          days.push(moment(weekStart).add(i, 'days').format("ddd MMM D Y"));
      }
      return days;
  }

  //Trailer Checking Functions

  const checkTrailer = async (trailer) => {
    const check = await Trailers.findOne({ trailer });
    if (check) {
      return (data = {
        status: false,
        msg: "This trailer is already in Utah Trailers",
      });
    }
    const check2 = await Illinoises.findOne({ trailer });
    if (check2) {
      return (data = {
        status: false,
        msg: "This trailer is already in Illinois table",
      });
    }
    const check3 = await Coloradoses.findOne({ trailer });
    if (check3) {
      return (data = {
        status: false,
        msg: "This trailer is already in Colorado table",
      });
    }
    const check4 = await Midwestes.findOne({ trailer });
    if (check4) {
      return (data = {
        status: false,
        msg: "This trailer is already in Midwest table",
      });
    }
    return false;
  };

  // Authentication Api's

  router.post("/login", LoginUser);
  router.get("/user", GetUser);
  router.get("/users", GetUsers);
  router.delete("/user", AuthenticateUser, DeleteUser);

  router.post("/register", Upload.single("image"), CreateUser);

  router.post("/notifications", AuthenticateUser, async (req, res) => {
    if (req.body.search) {
      const notifications = await Actionlogs.find({
        $or: [
          { title: { $regex: req.body.search, $options: "i" } },
          { newValue: { $regex: req.body.search, $options: "i" } },
          { prevValue: { $regex: req.body.search, $options: "i" } },
          { board: { $regex: req.body.search, $options: "i" } },
          { user: { $regex: req.body.search, $options: "i" } },
          { column: { $regex: req.body.search, $options: "i" } },
        ],
      })
      .sort("-createdAt")
      // .limit(10);
      
      return res.json({ notifications });
    } else {
      const notifications = await Actionlogs.find({})
        .sort("-createdAt")
        // .limit(10);
      res.json({ notifications });
    }
  });

  router.post("/notifications/delete", AuthenticateUser, async (req, res) => {
    try {
      const delId = req.body.delId;
      const searchInfo = req.body.searchInfo;
      if (searchInfo) {
        await Actionlogs.deleteMany({ "_id": delId });
        const notifications = await Actionlogs.find({
          $or: [
            { title: { $regex: searchInfo, $options: "i" } },
            { newValue: { $regex: searchInfo, $options: "i" } },
            { prevValue: { $regex: searchInfo, $options: "i" } },
            { board: { $regex: searchInfo, $options: "i" } },
            { user: { $regex: searchInfo, $options: "i" } },
            { column: { $regex: searchInfo, $options: "i" } },
          ],
        })
          .sort("-createdAt")
        
        var obj = { notifications: notifications };
        io.emit("DELETED_ACTIONLOGS", obj);
  
        res.json({ status: true, msg: "Deleted Successfully", notifications: notifications });
      } else {
        await Actionlogs.deleteMany({ "_id": delId });
        const notifications = await Actionlogs.find({})
          .sort("-createdAt")
        
        var obj = { notifications: notifications };
        io.emit("DELETED_ACTIONLOGS", obj);
  
        res.json({ status: true, msg: "Deleted Successfully", notifications: notifications });
      }
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  // TruckList Api's

  router.post("/truck", AuthenticateUser, async (req, res) => {
    try {
      const { truck_num, city, state, day, notes } = req.body;
      let daySort; 
      switch (day) {
        case "Monday":
          daySort = 1;
          break;
        case "Tuesday":
          daySort = 2;
          break;
        case "Wednesday":
          daySort = 3;
          break;
        case "Thursday":
          daySort = 4;
          break;
        case "Friday":
          daySort = 5;
          break;
        case "Saturday":
          daySort = 6;
          break;
        case "Sunday":
          daySort = 7;
          break;
        default:
          break;
      }

      if (!truck_num /*|| !city || !state*/ || !day) {
        return res.json({ status: false, msg: "Truck and Day are required" });
      }
      const check = await Trucks.findOne({ truck_num });
      if (check) {
        return res.json({ status: false, msg: "This Truck already exist" });
      }
      const check2 = await Requests.findOne({ truck_num });

      if (check2) {
        const truck = await Trucks.create({
          truck_num,
          city,
          state,
          day,
          request: "Match",
          notes,
          user: req.id,
          daySort
        });
        await Requests.findByIdAndUpdate(check2._id, { color: "orange" });
        io.emit("NEW_TRUCK", truck);
        await Users.findByIdAndUpdate(req.id, { $push: { trucks: truck._id } });
        return res.json({
          status: true,
          msg: "This truck matched with 'Request'",
        });
      }

      const truck = await Trucks.create({
        truck_num,
        city,
        state,
        day,
        notes,
        request: " ",
        user: req.id,
        daySort
      });

      io.emit("NEW_TRUCK", truck);
      await Users.findByIdAndUpdate(req.id, { $push: { trucks: truck._id } });
      const actionlog = await Actionlogs.create({
        board: "Daily Trucklist",
        newValue: truck.truck_num,
        user: req.user.user,
        title: "Truck is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Truck added successfully" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/trucks", AuthenticateUser, async (req, res) => {
    try {
      const trucks = await Trucks.find({}).sort("createdAt");
      res.json({ status: true, msg: trucks });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/truck", async (req, res) => {
    try {
      const { id } = req.query;
      const truck = await Trucks.findById(id);
      res.json({ status: true, msg: truck });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  function difference(object, base) {
    function changes(object, base) {
      return _.transform(object, function (result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(base[key])
              ? changes(value, base[key])
              : value;
        }
      });
    }
    return changes(object, base);
  }
  router.put("/truck", AuthenticateUser, async (req, res) => {
    try {
      const { truck_num, city, state, day, notes } = req.body;
      let daySort; 
      switch (day) {
        case "Monday":
          daySort = 1;
          break;
        case "Tuesday":
          daySort = 2;
          break;
        case "Wednesday":
          daySort = 3;
          break;
        case "Thursday":
          daySort = 4;
          break;
        case "Friday":
          daySort = 5;
          break;
        case "Saturday":
          daySort = 6;
          break;
        case "Sunday":
          daySort = 7;
          break;
        default:
          break;
      }
      const { id } = req.query;
      const prevTruck = await Trucks.findById(id);
      const truck = await Trucks.findByIdAndUpdate(
        id,
        { truck_num, city, state, day, notes, user: req.id, daySort },
        { returnDocument: "after" }
      );
      var obj = { truck: truck };
      io.emit("EDITED_TRUCK", obj);
      const data = difference({ ...truck }, { ...prevTruck });
      if (data._doc.day) {
        const actionlogByDay = await Actionlogs.create({
          newValue: truck.day,
          user: req.user.user,
          prevValue: prevTruck.day,
          column: "Day",
          board: "Daily Trucklist",
          title: "Truck " + truck.truck_num + " Info is changed"
        });
        io.emit("NEW_NOTIFICATION", actionlogByDay);
      }
      if (data._doc.notes) {
        const actionlogByNote = await Actionlogs.create({
          newValue: truck.notes,
          user: req.user.user,
          prevValue: prevTruck.notes,
          column: "Notes",
          board: "Daily Trucklist",
          title: "Truck " + truck.truck_num + " Info is changed"
        });
        io.emit("NEW_NOTIFICATION", actionlogByNote);
      } 
      if (data._doc.truck_num) {
        const actionlog = await Actionlogs.create({
          newValue: truck.truck_num,
          prevValue: prevTruck.truck_num,
          column: "Truck",
          board: "Daily Trucklist",
          user: req.user.user,
          title: "Truck " + truck.truck_num + " Info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      if (data._doc.city) {
        const actionlog = await Actionlogs.create({
          newValue: truck.city,
          prevValue: prevTruck.city,
          column: "City",
          board: "Daily Trucklist",
          user: req.user.user,
          title: "Truck " + truck.truck_num + " Info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      res.json({ status: true, msg: "Edited Successfully", truck: truck });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/truck", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const truck = await Trucks.findByIdAndDelete(id);
      await Requests.findOneAndUpdate(
        { truck_num: truck.truck_num },
        { $set: { color: "black" } }
      );
      var obj = { truck: truck };
      io.emit("DELETED_TRUCK", obj);
      const actionlog = await Actionlogs.create({
        prevValue: truck.truck_num,
        board: "Daily Trucklist",
        user: req.user.user,
        title: "Truck is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", truck: truck });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  //Trailers Api's

  router.post("/trailer", AuthenticateUser, async (req, res) => {
    try {
      const { trailer, empty, vendor, truck_num, notes } = req.body;

      if (!trailer) {
        return res.json({ status: false, msg: "Please enter trailer number" });
      }
      if (!vendor.name) {
        return res.json({ status: false, msg: "Please add a location" });
      }
      const checked = await checkTrailer(req.body.trailer);
      if (checked) {
        return res.json(checked);
      }

      const Trailer = await Trailers.create({
        trailer,
        empty,
        vendor: vendor,
        truck_num,
        notes,
        user: req.id,
      });
      io.emit("NEW_TRAILER", Trailer);
      await Users.findByIdAndUpdate(req.id, {
        $push: { trailers: Trailer._id },
      });
      const actionlog = await Actionlogs.create({
        newValue: Trailer.trailer,
        board: "Utah Trailers",
        user: req.user.user,
        title: "Utah Trailer is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Trailer added successfully" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/trailers", AuthenticateUser, async (req, res) => {
    try {
      const trailers = await Trailers.find({}).sort("createdAt");
      res.json({ status: true, msg: trailers });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/trailer", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const trailer = await Trailers.findByIdAndDelete(id);
      var obj = { trailer: trailer };
      io.emit("DELETED_TRAILER", obj);
      const actionlog = await Actionlogs.create({
        prevValue: trailer.trailer,
        board: "Utah Trailers",
        user: req.user.user,
        title: "Utah Trailer is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", trailer: trailer });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.put("/trailer", AuthenticateUser, async (req, res) => {
    try {
     
      const { trailer, empty, vendor, truck_num, notes } = req.body;
      const { id } = req.query;
      const prevTrailer = await Trailers.findById(id);
      //checking for duplicate trailers in all tables
      if (prevTrailer.trailer !== req.body.trailer) {
        const checked = await checkTrailer(req.body.trailer)
        if (checked) { return res.json(checked) }
    }
      const Trailer = await Trailers.findByIdAndUpdate(
        id,
        { trailer, empty, vendor, truck_num, notes, user: req.id },
        { returnDocument: "after" }
      );
      var obj = { trailer: Trailer, status: true };
      io.emit("EDITED_TRAILER", obj);
      const data = difference({ ...Trailer }, { ...prevTrailer });
      if (data._doc.notes) {
        const actionlog = await Actionlogs.create({
          prevValue: prevTrailer.notes,
          newValue: notes,
          board: "Utah Trailers",
          column: "Notes",
          user: req.user.user,
          title: "Tralier " + Trailer.trailer + " Info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.truck_num) {
        const actionlog = await Actionlogs.create({
          prevValue: prevTrailer.truck_num,
          newValue: truck_num,
          board: "Utah Trailers",
          column: "Truck",
          user: req.user.user,
          title: "Tralier " + Trailer.trailer + " Info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.vendor) {
        const actionlog = await Actionlogs.create({
          prevValue: prevTrailer.vendor.name,
          newValue: vendor.name,
          board: "Utah Trailers",
          column: "Vendor",
          user: req.user.user,
          title: "Tralier " + Trailer.trailer + " Info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.trailer) {
        const actionlog = await Actionlogs.create({
          prevValue: prevTrailer.trailer,
          newValue: trailer,
          board: "Utah Trailers",
          column: "Trailer",
          user: req.user.user,
          title: "Tralier " + trailer + " Info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      return res.json({
        status: true,
        msg: "Edited Successfully",
        trailer: Trailer,
      });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  // History Api's

  router.post("/history", AuthenticateUser, async (req, res) => {
    try {
      var { truck } = req.body;
      truck = JSON.parse(truck);
      const user = await Users.findById(req.id);
      const History = await Histories.create({
        truck: truck,
        user,
      });
      const Truck = await Trucks.findByIdAndDelete(truck._id);
      var obj = { truck: Truck };
      io.emit("DELETED_TRUCK", obj);
      io.emit("NEW_HISTORY", History);
      await Users.findByIdAndUpdate(req.id, {
        $push: { histories: History._id },
      });
      const actionlog = await Actionlogs.create({
        prevValue: Truck.truck_num,
        board: "Daily Trucklist",
        user: req.user.user,
        title: "Truck is dispatched",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Dispatched successfully" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.post("/historyback", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const history = await Histories.findByIdAndDelete(id);
      const Truck = await Trucks.create(history.truck);
      var obj = { history: history };
      io.emit("DELETED_HISTORY", obj);
      io.emit("NEW_TRUCK", Truck);
      const actionlog = await Actionlogs.create({
        prevValue: Truck.truck_num,
        board: "History",
        user: req.user.user,
        title: "Truck " + Truck.truck_num + " is restored",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Restored Successfully" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.get("/historys", AuthenticateUser, async (req, res) => {
    try {
      const histories = await Histories.find({}).sort("-createdAt");
      res.json({ status: true, msg: histories });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/history", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const idArrBuf = id.split(",");
      const idArr = idArrBuf.map((_id) => ObjectId(_id));
      const histories = await Histories.find({ _id: idArr });
      await Histories.deleteMany({ _id: { $in: idArr } });
      io.emit("DELETED_HISTORY", { idArrBuf: idArrBuf });
      histories.map( async (history)=>{
        const actionlog = await Actionlogs.create({
          prevValue: history.truck.truck_num,
          board: "History",
          user: req.user.user,
          title: "Truck is deleted",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      })
      res.json({ msg: "Deleted Successfully", idArrBuf });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  //Request Api's

  router.post("/request", AuthenticateUser, async (req, res) => {
    try {
      const { truck_num, location, date, notes } = req.body;

      if (!truck_num || !location) {
        return res.json({ status: false, msg: "Invalid Creadentials" });
      }
      const check = await Requests.findOne({ truck_num });
      if (check) {
        return res.json({ status: false, msg: "This Request already exist" });
      }
      const find = await Trucks.findOne({ truck_num });
      if (find) {
        await Trucks.findByIdAndUpdate(find._id, {
          $set: { request: "Match" },
        });
        const request = await Requests.create({
          truck_num,
          location,
          color: "orange",
          date,
          notes,
          user: req.id,
        });
        io.emit("NEW_REQUEST", request);
        await Users.findByIdAndUpdate(req.id, {
          $push: { requests: request._id },
        });
        const actionlog = await Actionlogs.create({
          prevValue: request.truck_num,
          board: "Request List",
          user: req.user.user,
          title: "Request truck is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
        return res.json({ status: true, msg: "Request added successfully" });
      }
      const find2 = await Shedules.find({
        $or: [
          { "monday.truck": truck_num },
          { "tuesday.truck": truck_num },
          { "wednesday.truck": truck_num },
          { "thursday.truck": truck_num },
          { "friday.truck": truck_num },
        ],
      });
      if (find2.length !== 0) {
        var result = _.pick(find2[0], [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
        ]);
        const Key = _.findKey(result, { truck: truck_num });
        var obj = {
          truck: truck_num,
          color: "white",
          textColor: "red",
          font: "normal",
        };
        await Shedules.findByIdAndUpdate(find2[0]._id, {
          $set: { [Key]: obj },
        });

        const request = await Requests.create({
          truck_num,
          location,
          color: "orange",
          date,
          notes,
          user: req.id,
        });
        io.emit("NEW_REQUEST", request);
        await Users.findByIdAndUpdate(req.id, {
          $push: { requests: request._id },
        });
        const actionlog = await Actionlogs.create({
          prevValue: request.truck_num,
          board: "Request List",
          user: req.user.user,
          title: "Request truck is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
        return res.json({ status: true, msg: "Request added successfully" });
      }
      const request = await Requests.create({
        truck_num,
        location,
        date,
        notes,
        user: req.id,
      });
      io.emit("NEW_REQUEST", request);
      await Users.findByIdAndUpdate(req.id, {
        $push: { requests: request._id },
      });
      const actionlog = await Actionlogs.create({
        newValue: request.truck_num,
        board: "Request List",
        user: req.user.user,
        title: "Requested truck is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Request added successfully" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/requests", AuthenticateUser, async (req, res) => {
    try {
      const request = await Requests.find({}).sort("-createdAt");
      res.json({ status: true, msg: request });
    } catch (error) {
      res.json({ status: false, error });
    }
  });

  router.put("/request", AuthenticateUser, async (req, res) => {
    try {
      const { truck_num, location, date, notes } = req.body;
      const { id } = req.query;
      const prevRequest = await Requests.findById(id);
      const request = await Requests.findByIdAndUpdate(
        id,
        { truck_num, location, date, notes, user: req.id },
        { returnDocument: "after" }
      );
      var obj = { request: request };
      io.emit("EDITED_REQUEST", obj);
      const data = difference({ ...request }, { ...prevRequest });
      if (data._doc.notes) {
        const actionlog = await Actionlogs.create({
          prevValue: prevRequest.notes,
          newValue: notes,
          board: "Request List",
          column: "Notes",
          user: req.user.user,
          title: "Requested truck " + request.truck_num + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.location) {
        const actionlog = await Actionlogs.create({
          prevValue: prevRequest.location,
          newValue: location,
          board: "Request List",
          column: "Location",
          user: req.user.user,
          title: "Requested truck " + request.truck_num + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.truck_num) {
        const actionlog = await Actionlogs.create({
          prevValue: prevRequest.truck_num,
          newValue: truck_num,
          board: "Request List",
          column: "Truck",
          user: req.user.user,
          title: "Requested truck " + request.truck_num + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      if (data._doc.date) {
        const actionlog = await Actionlogs.create({
          prevValue: prevRequest.date,
          newValue: date,
          board: "Request List",
          column: "Date",
          user: req.user.user,
          title: "Requested truck " + request.truck_num + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      res.json({ status: true, msg: "Edited Successfully", request: request });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/request", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const request = await Requests.findByIdAndDelete(id);
      await Trucks.findOneAndUpdate(
        { truck_num: request.truck_num },
        { $set: { request: "" } }
      );
      var truck_num = request.truck_num;
      const find2 = await Shedules.find({
        $or: [
          { "monday.truck": truck_num },
          { "tuesday.truck": truck_num },
          { "wednesday.truck": truck_num },
          { "thursday.truck": truck_num },
          { "friday.truck": truck_num },
        ],
      });
      if (find2.length !== 0) {
        var result = _.pick(find2[0], [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
        ]);
        const Key = _.findKey(result, { truck: truck_num });
        var obj = {
          truck: truck_num,
          color: "white",
          textColor: "black",
          font: "normal",
        };
        await Shedules.findByIdAndUpdate(find2[0]._id, {
          $set: { [Key]: obj },
        });
      }
      var obj = { request: request };
      io.emit("DELETED_REQUEST", obj);
      const actionlog = await Actionlogs.create({
        prevValue: request.truck_num,
        user: req.user.user,
        board: "Request List",
        title: "Request truck is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", request: request });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  //List Api's

  router.post("/trucklist", AuthenticateUser, async (req, res) => {
    try {
      const { name } = req.body;
      const check = await TruckLists.findOne({ name });
      if (check) {
        return res.json({ status: false, msg: "This truck already exist" });
      }
      var truck = await TruckLists.create({ ...req.body });

      res.json({ status: true, msg: "Truck Added", truck });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/trailerlist", AuthenticateUser, async (req, res) => {
    try {
      const { name } = req.body;
      const check = await TrailerLists.findOne({ name });
      if (check) {
        return res.json({ status: false, msg: "This trailer already exist" });
      }
      var trailer = await TrailerLists.create({ ...req.body });

      res.json({ status: true, msg: "Trailer Added", trailer });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/vendor", AuthenticateUser, async (req, res) => {
    try {
      const { name } = req.body;
      const check = await Vendors.findOne({ name });
      if (check) {
        return res.json({ status: false, msg: "This vendor already exist" });
      }
      var vendor = await Vendors.create({ ...req.body });

      res.json({ status: true, status: true, msg: "Vendor Added", vendor });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.get("/list", AuthenticateUser, async (req, res) => {
    try {
      var truck = await TruckLists.find({});
      var trailer = await TrailerLists.find({});
      var vendor = await Vendors.find({});

      res.json({ Trucks: truck, Trailers: trailer, Vendors: vendor });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/trucklist", AuthenticateUser, async (req, res) => {
    try {
      var truck = await TruckLists.findByIdAndDelete(req.query.id);

      res.json({ truck });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.delete("/trailerlist", AuthenticateUser, async (req, res) => {
    try {
      var trailer = await TrailerLists.findByIdAndDelete(req.query.id);

      res.json({ trailer });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.delete("/vendor", AuthenticateUser, async (req, res) => {
    try {
      var vendor = await Vendors.findByIdAndDelete(req.query.id);

      res.json({ vendor });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  //DedicatedLanes Api's

  router.post("/shedule", AuthenticateUser, async (req, res) => {
    try {
      var shedule = await Shedules.create({ ...req.body });
      const actionlog = await Actionlogs.create({
        newValue: shedule.location,
        board: "Dedicated Lanes",
        user: req.user.user,
        title: "Dedicated lane is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Location Added", shedule });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/shedule", AuthenticateUser, async (req, res) => {
    try {
      const shedules = await Shedules.find({});
      res.json({ status: true, msg: shedules });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.put("/shedule", AuthenticateUser, async (req, res) => {
    try {
      const check = await Requests.findOne({ truck_num: req.query.truck });
      await Requests.findOneAndUpdate(
        { truck_num: req.query.prevtruck },
        { $set: { color: "black" } }
      );
      if (check) {
        const Shedule = await Shedules.findByIdAndUpdate(
          req.query.id,
          { $set: { ...req.body } },
          { returnDocument: "after" }
        );
        var obj = { shedule: Shedule };
        await Requests.findByIdAndUpdate(check._id, { color: "orange" });
        io.emit("EDITED_SHEDULE", obj);
        const actionlog = await Actionlogs.create({
          prevValue: req.query.prevtruck,
          newValue: req.query.truck,
          column: _.startCase(
            _.camelCase(Object.keys(req.body)[0])
          ),
          board: "Dedicated Lanes",
          user: req.user.user,
          title: "Dedicated lane " + Shedule.location + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);

        return res.json({
          status: true,
          msg: "Edited Successfully",
          shedule: Shedule,
        });
      }
      const Shedule = await Shedules.findByIdAndUpdate(
        req.query.id,
        { $set: { ...req.body } },
        { returnDocument: "after" }
      );
      var obj = { shedule: Shedule };
      io.emit("EDITED_SHEDULE", obj);
      const actionlog = await Actionlogs.create({
        prevValue: req.query.prevtruck,
        newValue: req.query.truck,
        column: _.startCase(
          _.camelCase(Object.keys(req.body)[0])
        ),
        board: "Dedicated Lanes",
        user: req.user.user,
        title: "Dedicated lane " + Shedule.location + " info is changed",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Edited Successfully", shedule: Shedule });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.delete("/shedule", AuthenticateUser, async (req, res) => {
    try {
      var shedule = await Shedules.findByIdAndDelete(req.query.id);
      const actionlog = await Actionlogs.create({
        prevValue: shedule.location,
        board: "Dedicated Lanes",
        user: req.user.user,
        title: "Dedicated lane is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ shedule });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.put("/location", AuthenticateUser, async (req, res) => {
    try {
      const oldInfo = await Shedules.findById(req.query.id);
      const Shedule = await Shedules.findByIdAndUpdate(
        req.query.id,
        { $set: { ...req.body } },
        { returnDocument: "after" }
      );
      var obj = { shedule: Shedule };
      io.emit("EDITED_SHEDULE", obj);
      const actionlog = await Actionlogs.create({
        prevValue: oldInfo.location,
        newValue: Shedule.location,
        board: "Dedicated Lanes",
        user: req.user.user,
        title: "Location " + Shedule.location + " is changed",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Edited Successfully", shedule: Shedule });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  //Illinoises Api's

  router.post("/illinois", AuthenticateUser, async (req, res) => {
    try {
      const { trailer, location, truck_num, notes } = req.body;
      if (!trailer) {
        return res.json({ status: false, msg: "Invalid Creadentials" });
      }
      const checked = await checkTrailer(req.body.trailer);
      if (checked) {
        return res.json(checked);
      }

      var illinois = await Illinoises.create({ ...req.body });
      io.emit("NEW_ILLINOIS", illinois);
      const actionlog = await Actionlogs.create({
        newValue: illinois.trailer,
        board: "Illinois Trailers",
        user: req.user.user,
        title: "Illinois trailer is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Illinois Added" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.get("/illinois", AuthenticateUser, async (req, res) => {
    try {
      const illinoises = await Illinoises.find({});
      res.json({ status: true, msg: illinoises });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.put("/illinois", AuthenticateUser, async (req, res) => {
    try {
      const { trailer, location, truck_num, notes } = req.body;
      const { id } = req.query;
      const prevMidwest = await Illinoises.findById(id);
//checking for duplicates trailers
      if (prevMidwest.trailer !== req.body.trailer) {
        const checked = await checkTrailer(req.body.trailer)
        if (checked) { return res.json(checked) }
    }
      const Midwest = await Illinoises.findByIdAndUpdate(
        id,
        { trailer, location, truck_num, notes, user: req.id },
        { returnDocument: "after" }
      );
      var obj = { illinois: Midwest, status: true };
      io.emit("EDITED_ILLINOIS", obj);
      const data = difference({ ...Midwest }, { ...prevMidwest });
      if (data._doc.notes) {
        const actionlog = await Actionlogs.create({
          prevValue: prevMidwest.notes,
          newValue: notes,
          board: "Illinois Trailers",
          column: "Notes",
          user: req.user.user,
          title: "Illinois trailer " + Midwest.trailer + " is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.truck_num) {
        const actionlog = await Actionlogs.create({
          prevValue: prevMidwest.truck_num,
          newValue: truck_num,
          board: "Illinois Trailers",
          column: "Truck",
          user: req.user.user,
          title: "Illinois trailer " + Midwest.trailer + " is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.location) {
        const actionlog = await Actionlogs.create({
          prevValue: prevMidwest.location.name,
          newValue: Midwest.location.name,
          board: "Illinois Trailers",
          column: "Location",
          user: req.user.user,
          title: "Illinois trailer " + Midwest.trailer + " is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      if (data._doc.trailer) {
        const actionlog = await Actionlogs.create({
          prevValue: prevMidwest.trailer,
          newValue: trailer,
          board: "Illinois Trailers",
          column: "Trailer",
          user: req.user.user,
          title: "Illinois trailer " + Midwest.trailer + " is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      return res.json({
        status: true,
        msg: "Edited Successfully",
        illinois: Midwest,
      });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/illinois", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const illinois = await Illinoises.findByIdAndDelete(id);
      var obj = { illinois: illinois };
      io.emit("DELETED_ILLINOIS", obj);
      const actionlog = await Actionlogs.create({
        prevValue: illinois.trailer,
        board: "Illinois Trailers",
        user: req.user.user,
        title: "Illinois trailer is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", illinois: illinois });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  //Colorado Api's
  router.post("/colorado", AuthenticateUser, async (req, res) => {
    try {
      const { trailer, empty, location, truck_num, notes } = req.body;

      if (!trailer) {
        return res.json({ status: false, msg: "Please enter trailer number" });
      }

      const checked = await checkTrailer(req.body.trailer);
      if (checked) {
        return res.json(checked);
      }

      const Colorado = await Coloradoses.create({
        trailer,
        empty,
        location,
        truck_num,
        notes,
        user: req.id,
      });
      io.emit("NEW_COLORADO", Colorado);
      const actionlog = await Actionlogs.create({
        newValue: Colorado.trailer,
        board: "Colorado Trailers",
        user: req.user.user,
        title: "Colorado trailer is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Trailer added successfully" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/colorado", AuthenticateUser, async (req, res) => {
    try {
      const coloradoses = await Coloradoses.find({}).sort("createdAt");
      res.json({ status: true, msg: coloradoses });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/colorado", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const colorado = await Coloradoses.findByIdAndDelete(id);
      var obj = { colorado: colorado };
      io.emit("DELETED_COLORADO", obj);
      const actionlog = await Actionlogs.create({
        prevValue: colorado.trailer,
        board: "Colorado Trailers",
        user: req.user.user,
        title: "Colorado trailer is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", colorado: colorado });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.put("/colorado", AuthenticateUser, async (req, res) => {
    try {
      const { trailer, empty, location, truck_num, notes } = req.body;
      const { id } = req.query;
      const prevColorado = await Coloradoses.findById(id);
//cheking for duplicate trailers in all tables
      if (prevColorado.trailer !== req.body.trailer) {
        const checked = await checkTrailer(req.body.trailer)
        if (checked) { return res.json(checked) }
    }
      const Colorado = await Coloradoses.findByIdAndUpdate(
        id,
        { trailer, empty, location, truck_num, notes, user: req.id },
        { returnDocument: "after" }
      );
      var obj = { colorado: Colorado, status: true };
      io.emit("EDITED_COLORADO", obj);
      const data = difference({ ...Colorado }, { ...prevColorado });
      if (data._doc.notes) {
        const actionlog = await Actionlogs.create({
          prevValue: prevColorado.notes,
          newValue: notes,
          board: "Colorado Trailers",
          column: "Notes",
          user: req.user.user,
          title: "Colorado trailer " + Colorado.trailer + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      if (data._doc.location) {
        const actionlog = await Actionlogs.create({
          prevValue: prevColorado.location.name,
          newValue: location.name,
          board: "Colorado Trailers",
          column: "Location",
          user: req.user.user,
          title: "Colorado trailer " + Colorado.trailer + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      if (data._doc.truck_num) {
        const actionlog = await Actionlogs.create({
          prevValue: prevColorado.truck_num,
          newValue: truck_num,
          board: "Colorado Trailers",
          column: "Truck",
          user: req.user.user,
          title: "Colorado trailer " + Colorado.trailer + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      if (data._doc.trailer) {
        const actionlog = await Actionlogs.create({
          prevValue: prevColorado.trailer,
          newValue: trailer,
          board: "Colorado Trailers",
          column: "Trailer",
          user: req.user.user,
          title: "Colorado trailer " + Colorado.trailer + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      return res.json({
        status: true,
        msg: "Edited Successfully",
        colorado: Colorado,
      });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  //Midwest Api's
  router.post("/midwest", AuthenticateUser, async (req, res) => {
    try {
      const { trailer, location, truck_num, notes } = req.body;

      if (!trailer) {
        return res.json({ status: false, msg: "Please enter trailer number" });
      }

      const checked = await checkTrailer(req.body.trailer);
      if (checked) {
        return res.json(checked);
      }
      const Midwest = await Midwestes.create({
        trailer,
        location,
        truck_num,
        notes,
        user: req.id,
      });
      io.emit("NEW_MIDWEST", Midwest);
      const actionlog = await Actionlogs.create({
        newValue: Midwest.trailer,
        board: "Midwest Trailers",
        user: req.user.user,
        title: "Midwest trailer is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Trailer added successfully" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/midwest", AuthenticateUser, async (req, res) => {
    try {
      const coloradoses = await Midwestes.find({}).sort("createdAt");
      res.json({ status: true, msg: coloradoses });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/midwest", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const midwest = await Midwestes.findByIdAndDelete(id);
      var obj = { midwest: midwest };
      io.emit("DELETED_MIDWEST", obj);
      const actionlog = await Actionlogs.create({
        prevValue: midwest.trailer,
        board: "Midwest Trailers",
        user: req.user.user,
        title: "Midwest trailer is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", midwest: midwest });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.put("/midwest", AuthenticateUser, async (req, res) => {
    try {
      const { trailer, location, truck_num, notes } = req.body;
      const { id } = req.query;
      const prevMidwest = await Midwestes.findById(id);

// checking for duplicate trailers in all tables.
      if (prevMidwest.trailer !== req.body.trailer) {
        const checked = await checkTrailer(req.body.trailer)
        if (checked) { return res.json(checked) }
    }
      const Midwest = await Midwestes.findByIdAndUpdate(
        id,
        { trailer, location, truck_num, notes, user: req.id },
        { returnDocument: "after" }
      );
      var obj = { midwest: Midwest, status: true };
      io.emit("EDITED_MIDWEST", obj);
      const data = difference({ ...Midwest }, { ...prevMidwest });
      if (data._doc.notes) {
        const actionlog = await Actionlogs.create({
          prevValue: prevMidwest.notes,
          newValue: notes,
          board: "Midwest Trailers",
          column: "Notes",
          user: req.user.user,
          title: "Midwest trailer " + Midwest.trailer + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.truck_num) {
        const actionlog = await Actionlogs.create({
          prevValue: prevMidwest.truck_num,
          newValue: truck_num,
          board: "Midwest Trailers",
          column: "Truck",
          user: req.user.user,
          title: "Midwest trailer " + Midwest.trailer + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.location) {
        const actionlog = await Actionlogs.create({
          prevValue: prevMidwest.location.name,
          newValue: location.name,
          board: "Midwest Trailers",
          column: "Location",
          user: req.user.user,
          title: "Midwest trailer " + Midwest.trailer + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } 
      if (data._doc.trailer) {
        const actionlog = await Actionlogs.create({
          prevValue: prevMidwest.trailer,
          newValue: trailer,
          board: "Midwest Trailers",
          column: "Trailer",
          user: req.user.user,
          title: "Midwest trailer " + Midwest.trailer + " info is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }
      return res.json({
        status: true,
        msg: "Edited Successfully",
        midwest: Midwest,
      });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  //Calendar Api's

  router.post("/calendar", AuthenticateUser, async (req, res) => {
    try {
      var { truck_num, loads, startDate, endDate, truck_color, loads_color } =
        req.body;

      if (truck_num === "Add title") {
        truck_num = "";
      }
      if (!loads) {
        loads = "";
      }
      const check = await Calendars.findOne({ truck_num });
      if (check && truck_num !== "") {
        return res.json({ status: false, msg: "This truck already exist" });
      }
      const check2 = await Calendars.findOne({ loads });
      if (check2 && loads !== "") {
        return res.json({ status: false, msg: "This loads already exist " });
      }

      const Calendar = await Calendars.create({
        truck_num,
        loads,
        startDate,
        endDate,
        truck_color,
        loads_color,
      });
      var obj = { calendar: Calendar, user: req.query.socketId };

      io.emit("NEW_CALENDAR", obj);

      res.json({
        status: true,
        msg: "Shedule added successfully",
        data: Calendar,
      });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/calendars", AuthenticateUser, async (req, res) => {
    try {
      const calendars = await Calendars.find({});
      res.json({ status: true, msg: calendars });
    } catch (error) {
      res.json({ status: false, error });
    }
  });

  router.delete("/calendar", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const calendar = await Calendars.findByIdAndDelete(id);
      var obj = { calendar: calendar };
      io.emit("DELETED_CALENDAR", obj);
      res.json({ msg: "Deleted Successfully", calendar: calendar });
    } catch (error) {
      res.json({ status: true, error });
    }
  });

  router.put("/calendar", AuthenticateUser, async (req, res) => {
    try {
      var { truck_num, loads, startDate, endDate, truck_color, loads_color } =
        req.body;
      const { id, socketId } = req.query;
      if (truck_num === "Add title") {
        truck_num = "";
      }
      if (!loads) {
        loads = "";
      }
      const Calendar = await Calendars.findByIdAndUpdate(
        id,
        { truck_num, loads, startDate, endDate, truck_color, loads_color },
        { returnDocument: "after" }
      );
      var obj = { calendar: Calendar, user: socketId };

      io.emit("EDITED_CALENDAR", obj);
      return res.json({ status: true, msg: "Edited Successfully", obj });
    } catch (error) {
      res.json({ status: true, error });
    }
  });

  //Logics Api's
  router.get("/logics", AuthenticateUser, async (req, res) => {
    try {
      const histories = await Logics.find({});
      res.json({ status: true, msg: histories[0] });
    } catch (error) {
      res.json({ status: false, error });
    }
  });
  router.put("/logic", AuthenticateUser, async (req, res) => {
    try {
      // const logic = await Logics.create({ ...req.body })
      const logic = await Logics.findByIdAndUpdate(
        req.query.id,
        { ...req.body },
        { returnDocument: "after" }
      );
      return res.json({ status: true, msg: "Changed Successfully", logic });
    } catch (error) {
      res.json({ status: false, error });
    }
  });
  //Trailer Trucks
  router.post("/tillinois", AuthenticateUser, async (req, res) => {
    try {
      const { truck_num, notes } = req.body;
      const check = await TIllinoises.findOne({ truck_num });
      if (check) {
        return res.json({
          status: false,
          msg: "This Illinois Truck already exist",
        });
      }
      var tillinois = await TIllinoises.create({ ...req.body });
      io.emit("NEW_TILLINOIS", tillinois);
      const actionlog = await Actionlogs.create({
        newValue: tillinois.truck_num,
        board: "Illinois Extra Trucks",
        user: req.user.user,
        title: "Illinois truck is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Illinois Truck Added" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.put("/tillinois", AuthenticateUser, async (req, res) => {
    try {
      const { id, truck_num, notes } = req.body;
      const oldTillinoise = await TIllinoises.findOne({ _id: id });
      const check = await TIllinoises.findOne({ truck_num });
      if (check && oldTillinoise.truck_num !== truck_num) {
        return res.json({
          status: false,
          msg: "This Illinois Truck already exist",
        });
      } else {
        const tillinoise = await TIllinoises.findByIdAndUpdate(
          id,
          { truck_num, notes },
          { returnDocument: "after" }
        );
        const tillinoises = await TIllinoises.find({});
        io.emit("EDIT_ILLINOIS_TRUCK", { tillinoises });

        const data = difference({ ...tillinoise }, { ...oldTillinoise });
        if (data._doc.notes) {
          const actionlog = await Actionlogs.create({
            prevValue: oldTillinoise.notes,
            newValue: notes,
            board: "Illinois Extra Trucks",
            column: "Notes",
            user: req.user.user,
            title: "Illinois truck " + tillinoise.truck_num + " info is changed",
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        } 
        if (data._doc.truck_num) {
          const actionlog = await Actionlogs.create({
            prevValue: oldTillinoise.truck_num,
            newValue: truck_num,
            board: "Illinois Extra Trucks",
            column: "Truck",
            user: req.user.user,
            title: "Illinois truck " + tillinoise.truck_num + " info is changed",
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        }
        res.json({ status: true, msg: "Changed Successfully", tillinoises });
      }
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.get("/tillinois", AuthenticateUser, async (req, res) => {
    try {
      const tillinoises = await TIllinoises.find({});
      res.json({ status: true, msg: tillinoises });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.delete("/tillinois", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const tillinois = await TIllinoises.findByIdAndDelete(id);
      var obj = { tillinois: tillinois };
      io.emit("DELETED_TILLINOIS", obj);
      const actionlog = await Actionlogs.create({
        prevValue: tillinois.truck_num,
        board: "Illinois Extra Trucks",
        user: req.user.user,
        title: "Illinois truck is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", tillinois: tillinois });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/tcolorado", AuthenticateUser, async (req, res) => {
    try {
      const { truck_num, notes } = req.body;
      const check = await TColoradoses.findOne({ truck_num });
      if (check) {
        return res.json({
          status: false,
          msg: "This Colorado Truck already exist",
        });
      }
      var tillinois = await TColoradoses.create({ ...req.body });
      io.emit("NEW_TCOLORADO", tillinois);
      const actionlog = await Actionlogs.create({
        newValue: tillinois.truck_num,
        user: req.user.user,
        board: "Extra CO Trucks",
        title: "Colorado truck is added"
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Coloradoses Truck Added" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/tcolorado/editTruck", AuthenticateUser, async (req, res) => {
    try {
      const truck_num = req.body.truck_num;
      const notes = req.body.notes;
      const id = req.body.id;
      const oldTruck = await TColoradoses.findById(id);
      const judgeTruck = await TColoradoses.findOne({ truck_num: truck_num });

      if (judgeTruck) {
        if( judgeTruck._id.toString() !== id) {
          return res.json({
            status: false,
            msg: "This Trailers Truck already exist!",
          });
        }
      }
      await TColoradoses.findByIdAndUpdate(id, { truck_num: truck_num, notes: notes });
      let tillinois = await TColoradoses.findById(id); 
      
      io.emit("EDITED_TCOLORADO", tillinois);

      const data = difference({ ...tillinois }, { ...oldTruck });
        if (data._doc.notes) {
          const actionlog = await Actionlogs.create({
            prevValue: oldTruck.notes,
            newValue: notes,
            board: "Extra CO Trucks",
            column: "Notes",
            user: req.user.user,
            title: "Colorado truck " + tillinois.truck_num + " info is changed",
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        } 
        if (data._doc.truck_num) {
          const actionlog = await Actionlogs.create({
            prevValue: oldTruck.truck_num,
            newValue: truck_num,
            board: "Extra CO Trucks",
            column: "Truck",
            user: req.user.user,
            title: "Colorado truck " + tillinois.truck_num + " info is changed",
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        }

      res.json({ status: true, msg: "Trailers Truck Changed" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.get("/tcoloradoses", AuthenticateUser, async (req, res) => {
    try {
      const tillinoises = await TColoradoses.find({});
      res.json({ status: true, msg: tillinoises });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.delete("/tcolorado", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const tillinois = await TColoradoses.findByIdAndDelete(id);
      var obj = { tcolorado: tillinois };
      io.emit("DELETED_TCOLORADO", obj);
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: tillinois.truck_num,
        board: "Extra CO Trucks",
        title: "Colorado truck is deleted"
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", tcolorado: tillinois });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.post("/ttrailer", AuthenticateUser, async (req, res) => {
    try {
      const { truck_num, notes } = req.body;
      const check = await TTrailers.findOne({ truck_num });
      if (check) {
        return res.json({
          status: false,
          msg: "This Trailers Truck already exist",
        });
      }
      var tillinois = await TTrailers.create({ ...req.body });
      io.emit("NEW_TTRAILER", tillinois);
      const actionlog = await Actionlogs.create({
        newValue: tillinois.truck_num,
        user: req.user.user,
        board: "Extra UT Trucks",
        title: "Utah truck is added"
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ status: true, msg: "Trailers Truck Added" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.post("/ttrailer/editTruck", AuthenticateUser, async (req, res) => {
    try {
      const truck_num = req.body.truck_num;
      const notes = req.body.notes;
      const id = req.body.id;
      const oldTruck = await TTrailers.findById(id);
      const judgeTruck = await TTrailers.findOne({ truck_num: truck_num });

      if (judgeTruck) {
        if( judgeTruck._id.toString() !== id) {
          return res.json({
            status: false,
            msg: "This Trailers Truck already exist!",
          });
        }
      }
      await TTrailers.findByIdAndUpdate(id, { truck_num: truck_num, notes: notes });
      let tillinois = await TTrailers.findById(id); 
      
      io.emit("EDITED_TTRAILER", tillinois);
      
      const data = difference({ ...tillinois }, { ...oldTruck });
        if (data._doc.notes) {
          const actionlog = await Actionlogs.create({
            prevValue: oldTruck.notes,
            newValue: notes,
            board: "Extra UT Trucks",
            column: "Notes",
            user: req.user.user,
            title: "Utah truck info " + tillinois.truck_num + " is changed",
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        } 
        if (data._doc.truck_num) {
          const actionlog = await Actionlogs.create({
            prevValue: oldTruck.truck_num,
            newValue: truck_num,
            board: "Extra UT Trucks",
            column: "Truck",
            user: req.user.user,
            title: "Utah truck info " + tillinois.truck_num + " is changed",
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        }

      res.json({ status: true, msg: "Trailers Truck Changed" });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.get("/ttrailers", AuthenticateUser, async (req, res) => {
    try {
      const tillinoises = await TTrailers.find({});
      res.json({ status: true, msg: tillinoises });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  router.delete("/ttrailer", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const tillinois = await TTrailers.findByIdAndDelete(id);
      var obj = { ttrailer: tillinois };
      io.emit("DELETED_TTRAILER", obj);
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: tillinois.truck_num,
        board: "Extra UT Trucks",
        title: "Utah truck is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);
      res.json({ msg: "Deleted Successfully", ttrailer: tillinois });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  // UtahWeeklyCalendar Api's

  router.post("/utahCalendar/addRow", AuthenticateUser, async (req, res) => {
    try {
      const date = req.body.date;
      const newRow = await UtahWeeklyCalendar.create({
        date,
      });

      // Response using socket.io
      const obj = { newRow: newRow };
      io.emit("NEW_WEEKLYCALENDAR_ROW_UTAHCALENDAR", obj);

      res.json({ status: true, newRow: newRow});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/getInfosByDate", AuthenticateUser, async (req, res) => {
    try {
      const weeklyCalendarinfo = await UtahWeeklyCalendar.find({ 'date' : req.body.date });
      const calendarText = await UtahWeeklyCalendarText.find();
      
      // Notification using Socket.io
      res.json({ status: true, calendarInfos: weeklyCalendarinfo, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/utahCalendar/deleteRow", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const deletedRow = await UtahWeeklyCalendar.findByIdAndDelete(id);
      
      // Response using socket.io
      const obj = { deletedRow: deletedRow }
      io.emit("DELETED_ROW_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: deletedRow.load.value,
        column: "Load",
        board: "Utah Calendar",
        title: "Row is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      const truckactionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: deletedRow.trucks[0].value,
        column: "Truck",
        board: "Utah Calendar",
        title: "Row is deleted",
      });
      io.emit("NEW_NOTIFICATION", truckactionlog);

      res.json({ status: true, deletedRow: deletedRow });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/loadDispatch", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const load = req.body.load;
      let trucksVaules = [];
      trucks.forEach((item)=>{
        trucksVaules.push(item.value);
      })
      
      await UtahWeeklyCalendar.findByIdAndUpdate(id, { dispatched: true, trucks: trucks, load: load });
      const dispatchedInfos = await UtahWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { dispatchedInfos: dispatchedInfos };
      io.emit("DISPATCHED_LOAD_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        board: "Utah Calendar",
        title: "Load is dispatched",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dispatchedInfos: dispatchedInfos });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/unDispatch", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const load = req.body.load;
      let trucksVaules = [];
      trucks.forEach((item)=>{
        trucksVaules.push(item.value);
      })
      
      await UtahWeeklyCalendar.findByIdAndUpdate(id, { dispatched: false, trucks: trucks, load: load });
      const dispatchedInfos = await UtahWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { dispatchedInfos: dispatchedInfos };
      io.emit("UNDISPATCHED_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        board: "Utah Calendar",
        title: "Load is restored",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dispatchedInfos: dispatchedInfos });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/deleteTrucksInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const changedTrucks = req.body.changedTrucks;
      const deletedVaule = req.body.deletedVaule;

      const oldInfos = await UtahWeeklyCalendar.findById(id);
      let oldValue = [];
      oldInfos.trucks.map((info)=>{
        oldValue.push(info.value);
      })

      await UtahWeeklyCalendar.findByIdAndUpdate(id, { trucks: changedTrucks });
      const changedInfos = await UtahWeeklyCalendar.findById(id);
      let newValue = [];
      changedInfos.trucks.map((info)=>{
        newValue.push(info.value);
      })

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_TRUCKS_INFO_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldValue.toString(),
        newValue: newValue.toString(),
        column: "Truck",
        board: "Utah Calendar",
        title: "Truck is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/deleteLoadInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const oldInfos = await UtahWeeklyCalendar.findById(id);

      await UtahWeeklyCalendar.findByIdAndUpdate(id, { load: {} });
      const changedInfos = await UtahWeeklyCalendar.findById(id);
      let changedInfosTrucks = [];
      changedInfos.trucks.forEach((item)=>{
        changedInfosTrucks.push(item.value);
      })

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_LOAD_INFO_UTAHCALENDAR", obj);


      // Notification using Socket
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldInfos.load.value,
        column: "Load",
        board: "Utah Calendar",
        title: "Load is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/deleteLoadAddInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const oldInfos = await UtahWeeklyCalendar.findById(id);
      oldInfos.load.info = "";

      await UtahWeeklyCalendar.findByIdAndUpdate(id, { load: oldInfos.load });
      const changedInfos = await UtahWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_LOAD_ADDINFO_UTAHCALENDAR", obj);

      // Notification using Socket
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldInfos.load.info,
        column: "Load",
        board: "Utah Calendar",
        title: "Load " + changedInfos.load.value + " info is deleted"
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/dragAndDrop", AuthenticateUser, async (req, res) => {
    try {
      const dragId = req.body.dragId;
      const dragTrucks = req.body.dragTrucks;
      const dropId = req.body.dropId;
      const dropTrucks = req.body.dropTrucks;
      const changedValue = req.body.changedValue;

      await UtahWeeklyCalendar.findByIdAndUpdate(dragId, { trucks: dragTrucks });
      await UtahWeeklyCalendar.findByIdAndUpdate(dropId, { trucks: dropTrucks });
      const dragCell = await UtahWeeklyCalendar.findById(dragId);
      const dropCell = await UtahWeeklyCalendar.findById(dropId);

      // Response using socket.io
      const obj = { dragCell: dragCell, dropCell: dropCell };
      io.emit("DRAG_AND_DROP_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: dragCell.load.value,
        newValue: dropCell.load.value,
        column: "Truck",
        board: "Utah Calendar",
        title: "Truck " + changedValue + " is draged and droped",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dragCell: dragCell, dropCell: dropCell});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/updateTrucks", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;

      const oldTrucks = await UtahWeeklyCalendar.findById(id);
      let oldInfosTrucks = [];
      oldTrucks.trucks.forEach((item)=>{
        oldInfosTrucks.push(item.value)
      })

      await UtahWeeklyCalendar.findByIdAndUpdate(id, { trucks: trucks });
      const updatedTrucks = await UtahWeeklyCalendar.findById(id);
      let newInfosTrucks = [];
      updatedTrucks.trucks.forEach((item)=>{
        newInfosTrucks.push(item.value)
      })

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("UPDATED_TRUCKS_UTAHCALENDAR", obj);

      // Notification using Socket.io
      if (oldInfosTrucks.length === 0) {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: newInfosTrucks.toString(),
          column: "Truck",
          board: "Utah Calendar",
          title: "Truck is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: newInfosTrucks.toString(),
          prevValue: oldInfosTrucks.toString(),
          column: "Truck",
          board: "Utah Calendar",
          title: "Truck is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedTrucks: updatedTrucks});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/addTruckInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const truckInfo = req.body.truckInfo;
      
      const oldTrucks = await UtahWeeklyCalendar.findById(id);
      const oldTrucksInfo = oldTrucks.trucks[0]?.info;
      let tempTrucks = oldTrucks.trucks;
      tempTrucks[0].info = truckInfo;

      await UtahWeeklyCalendar.findByIdAndUpdate(id, { trucks: tempTrucks });
      const updatedTrucks = await UtahWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("ADDED_TRUCKINFO_UTAHCALENDAR", obj);

      // Notification using Socket.io
      if(oldTrucksInfo){
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedTrucks.trucks[0].info,
          prevValue: oldTrucksInfo,
          column: "Truck",
          board: "Utah Calendar",
          title: "Truck " + updatedTrucks.trucks[0].value + " info is changed"
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedTrucks.trucks[0].info,
          column: "Truck",
          board: "Utah Calendar",
          title: "Truck " + updatedTrucks.trucks[0].value + " info is added"
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedTrucks: updatedTrucks});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/addLoadInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const LoadInfo = req.body.LoadInfo;

      const oldLoad = await UtahWeeklyCalendar.findById(id);
      const oldLoadsInfo = oldLoad.load.info;
      let tempLoad = oldLoad.load;
      tempLoad.info = LoadInfo;

      if(!tempLoad.value){
        res.json({ status: false, msg: "The Load already exists!"});
      }else{
        await UtahWeeklyCalendar.findByIdAndUpdate(id, { load: tempLoad });
        const updatedLoad = await UtahWeeklyCalendar.findById(id);
        
        // Response using socket.io
        const obj = { updatedLoad: updatedLoad };
        io.emit("ADDED_LOADINFO_UTAHCALENDAR", obj);
  
        // Notification using Socket.io
        if(oldLoadsInfo){
          const actionlog = await Actionlogs.create({
            user: req.user.user,
            newValue: updatedLoad.load.info,
            prevValue: oldLoadsInfo,
            column: "Load",
            board: "Utah Calendar",
            title: "Load " + updatedLoad.load.value + " info is changed"
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        } else {
          const actionlog = await Actionlogs.create({
            user: req.user.user,
            newValue: updatedLoad.load.info,
            column: "Load",
            board: "Utah Calendar",
            title: "Load " + updatedLoad.load.value + " info is added"
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        }
  
        res.json({ status: true, updatedLoad: updatedLoad});
      }
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/updateLoad", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      let load = req.body.load;
      const date = req.body.date;
      
      const oldLoad = await UtahWeeklyCalendar.findById(id);
      if(load.value.length >= 7) {
        const tempString = load.value.slice(0,7);
        let days;
        if (date === 'current') days = getCurrentWeek();
        else days = getNextWeek();
        const datas = await UtahWeeklyCalendar.find({'date': days});
        let i = 0;
        datas.forEach((data)=>{
          let judgeString;
          if(data.load) judgeString =  data.load.value?.slice(0,7);
          if(tempString === judgeString) i++;
        })
        if(oldLoad.load?.value?.slice(0,7) === tempString) i--;

        if(i > 0) load.duplicated = true;
        else load.duplicated = false;
      }
      await UtahWeeklyCalendar.findByIdAndUpdate(id, { load: load });
      const updatedLoad = await UtahWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedLoad: updatedLoad };
      io.emit("UPDATED_LOAD_UTAHCALENDAR", obj);

      // Notification using Socket.io
      if (!oldLoad.load) {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedLoad.load.value,
          column: "Load",
          board: "Utah Calendar",
          title: "Load is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedLoad.load.value,
          prevValue: oldLoad.load.value,
          column: "Load",
          board: "Utah Calendar",
          title: "Load is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedLoad: updatedLoad});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/changeTruckColor", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const value = req.body.value;

      await UtahWeeklyCalendar.findByIdAndUpdate(id, { trucks: trucks });
      const updatedTrucks = await UtahWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("CHANEGED_TRUCK_COLOR_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: value,
        column: "Truck",
        board: "Utah Calendar",
        title: "Truck is ready",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, updatedTrucks: updatedTrucks });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/changeLoadColor", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const load = req.body.load;

      await UtahWeeklyCalendar.findByIdAndUpdate(id, { load: load });
      const updatedLoad = await UtahWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedLoad: updatedLoad };
      io.emit("CHANEGED_LOAD_COLOR_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        column: "Load",
        board: "Utah Calendar",
        title: "Load is ready",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, updatedLoad: updatedLoad });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });
  
  router.post("/utahCalendar/editCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const note = req.body.text;

      const oldNote = await UtahWeeklyCalendarText.findById(note._id);
      await UtahWeeklyCalendarText.findByIdAndUpdate(note._id, { text: note.text });
      const calendarText = await UtahWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("EDIT_CALENDAR_TEXT_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldNote.text,
        newValue: note.text,
        board: "Utah Calendar Notepad",
        title: "Note is changed",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/addCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const text = req.body.text;

      await UtahWeeklyCalendarText.create({ text: text });
      const calendarText = await UtahWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("ADD_CALENDAR_TEXT_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        newValue: text,
        board: "Utah Calendar Notepad",
        title: "Note is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/utahCalendar/deleteCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      
      const oldNote = await UtahWeeklyCalendarText.findByIdAndDelete(id);
      const calendarText = await UtahWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("DELETE_CALENDAR_TEXT_UTAHCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldNote.text,
        board: "Utah Calendar Notepad",
        title: "Note is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  // ColoradoWeeklyCalendar Api's

  router.post("/coloradoCalendar/addRow", AuthenticateUser, async (req, res) => {
    try {
      const date = req.body.date;
      const newRow = await ColoradoWeeklyCalendar.create({
        date,
      });

      // Response using socket.io
      const obj = { newRow: newRow };
      io.emit("NEW_WEEKLYCALENDAR_ROW_COLORADOCALENDAR", obj);

      res.json({ status: true, newRow: newRow});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/getInfosByDate", AuthenticateUser, async (req, res) => {
    try {
      const weeklyCalendarinfo = await ColoradoWeeklyCalendar.find({ 'date' : req.body.date });
      const calendarText = await ColoradoWeeklyCalendarText.find();

      // Notification using Socket.io
      res.json({ status: true, calendarInfos: weeklyCalendarinfo, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/coloradoCalendar/deleteRow", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const deletedRow = await ColoradoWeeklyCalendar.findByIdAndDelete(id);
      
      // Response using socket.io
      const obj = { deletedRow: deletedRow }
      io.emit("DELETED_ROW_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: deletedRow.load.value,
        column: "Load",
        board: "Colorado Calendar",
        title: "Row is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      const truckactionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: deletedRow.trucks[0].value,
        column: "Truck",
        board: "Colorado Calendar",
        title: "Row is deleted",
      });
      io.emit("NEW_NOTIFICATION", truckactionlog);

      res.json({ status: true, deletedRow: deletedRow });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/loadDispatch", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const load = req.body.load;
      let trucksVaules = [];
      trucks.forEach((item)=>{
        trucksVaules.push(item.value);
      })
      
      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { dispatched: true, trucks: trucks, load: load });
      const dispatchedInfos = await ColoradoWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { dispatchedInfos: dispatchedInfos };
      io.emit("DISPATCHED_LOAD_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        board: "Colorado Calendar",
        title: "Load is dispatched",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dispatchedInfos: dispatchedInfos });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/unDispatch", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const load = req.body.load;
      let trucksVaules = [];
      trucks.forEach((item)=>{
        trucksVaules.push(item.value);
      })
      
      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { dispatched: false, trucks: trucks, load: load });
      const dispatchedInfos = await ColoradoWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { dispatchedInfos: dispatchedInfos };
      io.emit("UNDISPATCHED_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        board: "Colorado Calendar",
        title: "Load is restored",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dispatchedInfos: dispatchedInfos });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/deleteTrucksInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const changedTrucks = req.body.changedTrucks;
      const deletedVaule = req.body.deletedVaule;

      const oldInfos = await ColoradoWeeklyCalendar.findById(id);
      let oldValue = [];
      oldInfos.trucks.map((info)=>{
        oldValue.push(info.value);
      })

      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { trucks: changedTrucks });
      const changedInfos = await ColoradoWeeklyCalendar.findById(id);
      let newValue = [];
      changedInfos.trucks.map((info)=>{
        newValue.push(info.value);
      })

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_TRUCKS_INFO_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldValue.toString(),
        newValue: newValue.toString(),
        column: "Truck",
        board: "Colorado Calendar",
        title: "Truck is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/deleteLoadInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const oldInfos = await ColoradoWeeklyCalendar.findById(id);

      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { load: {} });
      const changedInfos = await ColoradoWeeklyCalendar.findById(id);
      let changedInfosTrucks = [];
      changedInfos.trucks.forEach((item)=>{
        changedInfosTrucks.push(item.value);
      })

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_LOAD_INFO_COLORADOCALENDAR", obj);


      // Notification using Socket
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldInfos.load.value,
        column: "Load",
        board: "Colorado Calendar",
        title: "Load is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/deleteLoadAddInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const oldInfos = await ColoradoWeeklyCalendar.findById(id);
      oldInfos.load.info = "";

      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { load: oldInfos.load });
      const changedInfos = await ColoradoWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_LOAD_ADDINFO_COLORADOCALENDAR", obj);

      // Notification using Socket
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldInfos.load.info,
        column: "Load",
        board: "Colorado Calendar",
        title: "Load " + changedInfos.load.value + " info is deleted"
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/dragAndDrop", AuthenticateUser, async (req, res) => {
    try {
      const dragId = req.body.dragId;
      const dragTrucks = req.body.dragTrucks;
      const dropId = req.body.dropId;
      const dropTrucks = req.body.dropTrucks;
      const changedValue = req.body.changedValue;

      await ColoradoWeeklyCalendar.findByIdAndUpdate(dragId, { trucks: dragTrucks });
      await ColoradoWeeklyCalendar.findByIdAndUpdate(dropId, { trucks: dropTrucks });
      const dragCell = await ColoradoWeeklyCalendar.findById(dragId);
      const dropCell = await ColoradoWeeklyCalendar.findById(dropId);

      // Response using socket.io
      const obj = { dragCell: dragCell, dropCell: dropCell };
      io.emit("DRAG_AND_DROP_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: dragCell.load.value,
        newValue: dropCell.load.value,
        column: "Truck",
        board: "Colorado Calendar",
        title: "Truck " + changedValue + " is draged and droped",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dragCell: dragCell, dropCell: dropCell});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/updateTrucks", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;

      const oldTrucks = await ColoradoWeeklyCalendar.findById(id);
      let oldInfosTrucks = [];
      oldTrucks.trucks.forEach((item)=>{
        oldInfosTrucks.push(item.value)
      })

      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { trucks: trucks });
      const updatedTrucks = await ColoradoWeeklyCalendar.findById(id);
      let newInfosTrucks = [];
      updatedTrucks.trucks.forEach((item)=>{
        newInfosTrucks.push(item.value)
      })

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("UPDATED_TRUCKS_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      if (oldInfosTrucks.length === 0) {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: newInfosTrucks.toString(),
          column: "Truck",
          board: "Colorado Calendar",
          title: "Truck is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: newInfosTrucks.toString(),
          prevValue: oldInfosTrucks.toString(),
          column: "Truck",
          board: "Colorado Calendar",
          title: "Truck is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedTrucks: updatedTrucks});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/addTruckInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const truckInfo = req.body.truckInfo;

      const oldTrucks = await ColoradoWeeklyCalendar.findById(id);
      const oldTrucksInfo = oldTrucks.trucks[0].info;
      let tempTrucks = oldTrucks.trucks;
      tempTrucks[0].info = truckInfo;

      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { trucks: tempTrucks });
      const updatedTrucks = await ColoradoWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("ADDED_TRUCKINFO_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      if(oldTrucksInfo){
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedTrucks.trucks[0].info,
          prevValue: oldTrucksInfo,
          column: "Truck",
          board: "Colorado Calendar",
          title: "Truck " + updatedTrucks.trucks[0].value + " info is changed"
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedTrucks.trucks[0].info,
          column: "Truck",
          board: "Colorado Calendar",
          title: "Truck " + updatedTrucks.trucks[0].value + " info is added"
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedTrucks: updatedTrucks});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/addLoadInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const LoadInfo = req.body.LoadInfo;

      const oldLoad = await ColoradoWeeklyCalendar.findById(id);
      const oldLoadsInfo = oldLoad.load.info;
      let tempLoad = oldLoad.load;
      tempLoad.info = LoadInfo;

      if(!tempLoad.value){
        res.json({ status: false, msg: "The Load already exists!"});
      }else{
        await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { load: tempLoad });
        const updatedLoad = await ColoradoWeeklyCalendar.findById(id);

        // Response using socket.io
        const obj = { updatedLoad: updatedLoad };
        io.emit("ADDED_LOADINFO_COLORADOCALENDAR", obj);

        // Notification using Socket.io
        if(oldLoadsInfo){
          const actionlog = await Actionlogs.create({
            user: req.user.user,
            newValue: updatedLoad.load.info,
            prevValue: oldLoadsInfo,
            column: "Load",
            board: "Colorado Calendar",
            title: "Load " + updatedLoad.load.value + " info is changed"
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        } else {
          const actionlog = await Actionlogs.create({
            user: req.user.user,
            newValue: updatedLoad.load.info,
            column: "Load",
            board: "Colorado Calendar",
            title: "Load " + updatedLoad.load.value + " info is added"
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        }

        res.json({ status: true, updatedLoad: updatedLoad});
      }
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/updateLoad", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      let load = req.body.load;
      const date = req.body.date;
      
      const oldLoad = await ColoradoWeeklyCalendar.findById(id);
      if(load.value.length >= 7) {
        const tempString = load.value.slice(0,7);
        let days;
        if (date === 'current') days = getCurrentWeek();
        else days = getNextWeek();
        const datas = await ColoradoWeeklyCalendar.find({'date': days});
        let i = 0;
        datas.forEach((data)=>{
          let judgeString;
          if(data.load) judgeString =  data.load.value?.slice(0,7);
          if(tempString === judgeString) i++;
        })
        if(oldLoad.load?.value?.slice(0,7) === tempString) i--;

        if(i > 0) load.duplicated = true;
        else load.duplicated = false;
      }
      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { load: load });
      const updatedLoad = await ColoradoWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedLoad: updatedLoad };
      io.emit("UPDATED_LOAD_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      if (!oldLoad.load) {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedLoad.load.value,
          column: "Load",
          board: "Colorado Calendar",
          title: "Load is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedLoad.load.value,
          prevValue: oldLoad.load.value,
          column: "Load",
          board: "Colorado Calendar",
          title: "Load is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedLoad: updatedLoad});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/changeTruckColor", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const value = req.body.value;

      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { trucks: trucks });
      const updatedTrucks = await ColoradoWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("CHANEGED_TRUCK_COLOR_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: value,
        column: "Truck",
        board: "Colorado Calendar",
        title: "Truck is ready",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, updatedTrucks: updatedTrucks });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/changeLoadColor", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const load = req.body.load;

      await ColoradoWeeklyCalendar.findByIdAndUpdate(id, { load: load });
      const updatedLoad = await ColoradoWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedLoad: updatedLoad };
      io.emit("CHANEGED_LOAD_COLOR_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        column: "Load",
        board: "Colorado Calendar",
        title: "Load is ready",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, updatedLoad: updatedLoad });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/editCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const note = req.body.text;
      console.log('note', note);

      const oldNote = await ColoradoWeeklyCalendarText.findById(note._id);
      await ColoradoWeeklyCalendarText.findByIdAndUpdate(note._id, { text: note.text });
      const calendarText = await ColoradoWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("EDIT_CALENDAR_TEXT_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldNote.text,
        newValue: note.text,
        board: "Colorado Calendar Notepad",
        title: "Note is changed",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/addCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const text = req.body.text;

      await ColoradoWeeklyCalendarText.create({ text: text });
      const calendarText = await ColoradoWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("ADD_CALENDAR_TEXT_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        newValue: text,
        board: "Colorado Calendar Notepad",
        title: "Note is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/coloradoCalendar/deleteCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      
      const oldNote = await ColoradoWeeklyCalendarText.findByIdAndDelete(id);
      const calendarText = await ColoradoWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("DELETE_CALENDAR_TEXT_COLORADOCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldNote.text,
        board: "Colorado Calendar Notepad",
        title: "Note is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  // MidwestWeeklyCalendar Api's

  router.post("/midwestCalendar/addRow", AuthenticateUser, async (req, res) => {
    try {
      const date = req.body.date;
      const newRow = await MidwestWeeklyCalendar.create({
        date,
      });

      // Response using socket.io
      const obj = { newRow: newRow };
      io.emit("NEW_WEEKLYCALENDAR_ROW_MIDWESTCALENDAR", obj);

      res.json({ status: true, newRow: newRow});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/getInfosByDate", AuthenticateUser, async (req, res) => {
    try {
      const weeklyCalendarinfo = await MidwestWeeklyCalendar.find({ 'date' : req.body.date });
      const calendarText = await MidwestWeeklyCalendarText.find();
      // Notification using Socket.io
      res.json({ status: true, calendarInfos: weeklyCalendarinfo, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/midwestCalendar/deleteRow", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const deletedRow = await MidwestWeeklyCalendar.findByIdAndDelete(id);
      
      // Response using socket.io
      const obj = { deletedRow: deletedRow }
      io.emit("DELETED_ROW_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: deletedRow.load.value,
        column: "Load",
        board: "Midwest Calendar",
        title: "Row is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      const truckactionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: deletedRow.trucks[0].value,
        column: "Truck",
        board: "Midwest Calendar",
        title: "Row is deleted",
      });
      io.emit("NEW_NOTIFICATION", truckactionlog);

      res.json({ status: true, deletedRow: deletedRow });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/loadDispatch", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const load = req.body.load;
      let trucksVaules = [];
      trucks.forEach((item)=>{
        trucksVaules.push(item.value);
      })
      
      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { dispatched: true, trucks: trucks, load: load });
      const dispatchedInfos = await MidwestWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { dispatchedInfos: dispatchedInfos };
      io.emit("DISPATCHED_LOAD_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        board: "Midwest Calendar",
        title: "Load is dispatched",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dispatchedInfos: dispatchedInfos });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/unDispatch", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const load = req.body.load;
      let trucksVaules = [];
      trucks.forEach((item)=>{
        trucksVaules.push(item.value);
      })
      
      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { dispatched: false, trucks: trucks, load: load });
      const dispatchedInfos = await MidwestWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { dispatchedInfos: dispatchedInfos };
      io.emit("UNDISPATCHED_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        board: "Midwest Calendar",
        title: "Load is restored",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dispatchedInfos: dispatchedInfos });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/deleteTrucksInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const changedTrucks = req.body.changedTrucks;
      const deletedVaule = req.body.deletedVaule;

      const oldInfos = await MidwestWeeklyCalendar.findById(id);
      let oldValue = [];
      oldInfos.trucks.map((info)=>{
        oldValue.push(info.value);
      })

      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { trucks: changedTrucks });
      const changedInfos = await MidwestWeeklyCalendar.findById(id);
      let newValue = [];
      changedInfos.trucks.map((info)=>{
        newValue.push(info.value);
      })

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_TRUCKS_INFO_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldValue.toString(),
        newValue: newValue.toString(),
        column: "Truck",
        board: "Midwest Calendar",
        title: "Truck is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/deleteLoadInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const oldInfos = await MidwestWeeklyCalendar.findById(id);

      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { load: {} });
      const changedInfos = await MidwestWeeklyCalendar.findById(id);
      let changedInfosTrucks = [];
      changedInfos.trucks.forEach((item)=>{
        changedInfosTrucks.push(item.value);
      })

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_LOAD_INFO_MIDWESTCALENDAR", obj);


      // Notification using Socket
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldInfos.load.value,
        column: "Load",
        board: "Midwest Calendar",
        title: "Load is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/deleteLoadAddInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const oldInfos = await MidwestWeeklyCalendar.findById(id);
      oldInfos.load.info = "";

      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { load: oldInfos.load });
      const changedInfos = await MidwestWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_LOAD_ADDINFO_MIDWESTCALENDAR", obj);

      // Notification using Socket
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldInfos.load.info,
        column: "Load",
        board: "Midwest Calendar",
        title: "Load " + changedInfos.load.value + " info is deleted"
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/dragAndDrop", AuthenticateUser, async (req, res) => {
    try {
      const dragId = req.body.dragId;
      const dragTrucks = req.body.dragTrucks;
      const dropId = req.body.dropId;
      const dropTrucks = req.body.dropTrucks;
      const changedValue = req.body.changedValue;

      await MidwestWeeklyCalendar.findByIdAndUpdate(dragId, { trucks: dragTrucks });
      await MidwestWeeklyCalendar.findByIdAndUpdate(dropId, { trucks: dropTrucks });
      const dragCell = await MidwestWeeklyCalendar.findById(dragId);
      const dropCell = await MidwestWeeklyCalendar.findById(dropId);

      // Response using socket.io
      const obj = { dragCell: dragCell, dropCell: dropCell };
      io.emit("DRAG_AND_DROP_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: dragCell.load.value,
        newValue: dropCell.load.value,
        column: "Truck",
        board: "Midwest Calendar",
        title: "Truck " + changedValue + " is draged and droped",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dragCell: dragCell, dropCell: dropCell});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/updateTrucks", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;

      const oldTrucks = await MidwestWeeklyCalendar.findById(id);
      let oldInfosTrucks = [];
      oldTrucks.trucks.forEach((item)=>{
        oldInfosTrucks.push(item.value)
      })

      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { trucks: trucks });
      const updatedTrucks = await MidwestWeeklyCalendar.findById(id);
      let newInfosTrucks = [];
      updatedTrucks.trucks.forEach((item)=>{
        newInfosTrucks.push(item.value)
      })

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("UPDATED_TRUCKS_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      if (oldInfosTrucks.length === 0) {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: newInfosTrucks.toString(),
          column: "Truck",
          board: "Midwest Calendar",
          title: "Truck is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: newInfosTrucks.toString(),
          prevValue: oldInfosTrucks.toString(),
          column: "Truck",
          board: "Midwest Calendar",
          title: "Truck is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedTrucks: updatedTrucks});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/addTruckInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const truckInfo = req.body.truckInfo;

      const oldTrucks = await MidwestWeeklyCalendar.findById(id);
      const oldTrucksInfo = oldTrucks.trucks[0].info;
      let tempTrucks = oldTrucks.trucks;
      tempTrucks[0].info = truckInfo;

      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { trucks: tempTrucks });
      const updatedTrucks = await MidwestWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("ADDED_TRUCKINFO_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      if(oldTrucksInfo){
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedTrucks.trucks[0].info,
          prevValue: oldTrucksInfo,
          column: "Truck",
          board: "Midwest Calendar",
          title: "Truck " + updatedTrucks.trucks[0].value + " info is changed"
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedTrucks.trucks[0].info,
          column: "Truck",
          board: "Midwest Calendar",
          title: "Truck " + updatedTrucks.trucks[0].value + " info is added"
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedTrucks: updatedTrucks});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/addLoadInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const LoadInfo = req.body.LoadInfo;
      
      const oldLoad = await MidwestWeeklyCalendar.findById(id);
      const oldLoadsInfo = oldLoad.load;
      let tempLoad = oldLoad.load;
      if(tempLoad?.info || tempLoad?.info === '') tempLoad.info = LoadInfo;
      
      if(!tempLoad?.value){
        res.json({ status: false, msg: "The Load already exists!"});
      }else{
        await MidwestWeeklyCalendar.findByIdAndUpdate(id, { load: tempLoad });
        const updatedLoad = await MidwestWeeklyCalendar.findById(id);

        // Response using socket.io
        const obj = { updatedLoad: updatedLoad };
        io.emit("ADDED_LOADINFO_MIDWESTCALENDAR", obj);

        // Notification using Socket.io
        if(oldLoadsInfo){
          const actionlog = await Actionlogs.create({
            user: req.user.user,
            newValue: updatedLoad.load.info,
            prevValue: oldLoadsInfo.info,
            column: "Load",
            board: "Midwest Calendar",
            title: "Load " + updatedLoad.load.value + " info is changed"
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        } else {
          const actionlog = await Actionlogs.create({
            user: req.user.user,
            newValue: updatedLoad.load.info,
            column: "Load",
            board: "Midwest Calendar",
            title: "Load " + updatedLoad.load.value + " info is added"
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        }

        res.json({ status: true, updatedLoad: updatedLoad});
      }
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/updateLoad", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      let load = req.body.load;
      const date = req.body.date;

      const oldLoad = await MidwestWeeklyCalendar.findById(id);
      if(load.value.length >= 7) {
        const tempString = load.value.slice(0,7);
        let days;
        if (date === 'current') days = getCurrentWeek();
        else days = getNextWeek();
        const datas = await MidwestWeeklyCalendar.find({'date': days});
        let i = 0;
        datas.forEach((data)=>{
          let judgeString;
          if(data.load) judgeString =  data.load.value?.slice(0,7);
          if(tempString === judgeString) i++;
        })
        if(oldLoad.load?.value?.slice(0,7) === tempString) i--;

        if(i > 0) load.duplicated = true;
        else load.duplicated = false;
      }
      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { load: load });
      const updatedLoad = await MidwestWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedLoad: updatedLoad };
      io.emit("UPDATED_LOAD_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      if (!oldLoad.load) {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedLoad.load.value,
          column: "Load",
          board: "Midwest Calendar",
          title: "Load is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedLoad.load.value,
          prevValue: oldLoad.load.value,
          column: "Load",
          board: "Midwest Calendar",
          title: "Load is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedLoad: updatedLoad});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/changeTruckColor", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const value = req.body.value;

      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { trucks: trucks });
      const updatedTrucks = await MidwestWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("CHANEGED_TRUCK_COLOR_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: value,
        column: "Truck",
        board: "Midwest Calendar",
        title: "Truck is ready",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, updatedTrucks: updatedTrucks });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/changeLoadColor", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const load = req.body.load;

      await MidwestWeeklyCalendar.findByIdAndUpdate(id, { load: load });
      const updatedLoad = await MidwestWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedLoad: updatedLoad };
      io.emit("CHANEGED_LOAD_COLOR_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        column: "Load",
        board: "Midwest Calendar",
        title: "Load is ready",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, updatedLoad: updatedLoad });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/editCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const note = req.body.text;

      const oldNote = await MidwestWeeklyCalendarText.findById(note._id);
      await MidwestWeeklyCalendarText.findByIdAndUpdate(note._id, { text: note.text });
      const calendarText = await MidwestWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("EDIT_CALENDAR_TEXT_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldNote.text,
        newValue: note.text,
        board: "Midwest Calendar Notepad",
        title: "Note is changed",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/addCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const text = req.body.text;

      await MidwestWeeklyCalendarText.create({ text: text });
      const calendarText = await MidwestWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("ADD_CALENDAR_TEXT_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        newValue: text,
        board: "Midwest Calendar Notepad",
        title: "Note is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/midwestCalendar/deleteCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      
      const oldNote = await MidwestWeeklyCalendarText.findByIdAndDelete(id);
      const calendarText = await MidwestWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("DELETE_CALENDAR_TEXT_MIDWESTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldNote.text,
        board: "Midwest Calendar Notepad",
        title: "Note is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  // EastWeeklyCalendar Api's

  router.post("/eastCalendar/addRow", AuthenticateUser, async (req, res) => {
    try {
      const date = req.body.date;
      const newRow = await EastWeeklyCalendar.create({
        date,
      });

      // Response using socket.io
      const obj = { newRow: newRow };
      io.emit("NEW_WEEKLYCALENDAR_ROW_EASTCALENDAR", obj);

      res.json({ status: true, newRow: newRow});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/getInfosByDate", AuthenticateUser, async (req, res) => {
    try {
      const weeklyCalendarinfo = await EastWeeklyCalendar.find({ 'date' : req.body.date });
      const calendarText = await EastWeeklyCalendarText.find();

      // Notification using Socket.io
      res.json({ status: true, calendarInfos: weeklyCalendarinfo, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.delete("/eastCalendar/deleteRow", AuthenticateUser, async (req, res) => {
    try {
      const { id } = req.query;
      const deletedRow = await EastWeeklyCalendar.findByIdAndDelete(id);
      
      // Response using socket.io
      const obj = { deletedRow: deletedRow }
      io.emit("DELETED_ROW_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: deletedRow.load.value,
        column: "Load",
        board: "East Calendar",
        title: "Row is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      const truckactionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: deletedRow.trucks[0].value,
        column: "Truck",
        board: "East Calendar",
        title: "Row is deleted",
      });
      io.emit("NEW_NOTIFICATION", truckactionlog);

      res.json({ status: true, deletedRow: deletedRow });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/loadDispatch", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const load = req.body.load;
      let trucksVaules = [];
      trucks.forEach((item)=>{
        trucksVaules.push(item.value);
      })
      
      await EastWeeklyCalendar.findByIdAndUpdate(id, { dispatched: true, trucks: trucks, load: load });
      const dispatchedInfos = await EastWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { dispatchedInfos: dispatchedInfos };
      io.emit("DISPATCHED_LOAD_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        board: "East Calendar",
        title: "Load is dispatched",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dispatchedInfos: dispatchedInfos });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/unDispatch", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const load = req.body.load;
      let trucksVaules = [];
      trucks.forEach((item)=>{
        trucksVaules.push(item.value);
      })
      
      await EastWeeklyCalendar.findByIdAndUpdate(id, { dispatched: false, trucks: trucks, load: load });
      const dispatchedInfos = await EastWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { dispatchedInfos: dispatchedInfos };
      io.emit("UNDISPATCHED_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        board: "East Calendar",
        title: "Load is restored",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dispatchedInfos: dispatchedInfos });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/deleteTrucksInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const changedTrucks = req.body.changedTrucks;
      const deletedVaule = req.body.deletedVaule;

      const oldInfos = await EastWeeklyCalendar.findById(id);
      let oldValue = [];
      oldInfos.trucks.map((info)=>{
        oldValue.push(info.value);
      })

      await EastWeeklyCalendar.findByIdAndUpdate(id, { trucks: changedTrucks });
      const changedInfos = await EastWeeklyCalendar.findById(id);
      let newValue = [];
      changedInfos.trucks.map((info)=>{
        newValue.push(info.value);
      })

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_TRUCKS_INFO_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldValue.toString(),
        newValue: newValue.toString(),
        column: "Truck",
        board: "East Calendar",
        title: "Truck is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/deleteLoadInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const oldInfos = await EastWeeklyCalendar.findById(id);

      await EastWeeklyCalendar.findByIdAndUpdate(id, { load: {} });
      const changedInfos = await EastWeeklyCalendar.findById(id);
      let changedInfosTrucks = [];
      changedInfos.trucks.forEach((item)=>{
        changedInfosTrucks.push(item.value);
      })

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_LOAD_INFO_EASTCALENDAR", obj);


      // Notification using Socket
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldInfos.load.value,
        column: "Load",
        board: "East Calendar",
        title: "Load is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/deleteLoadAddInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const oldInfos = await EastWeeklyCalendar.findById(id);
      oldInfos.load.info = "";

      await EastWeeklyCalendar.findByIdAndUpdate(id, { load: oldInfos.load });
      const changedInfos = await EastWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { changedInfos: changedInfos };
      io.emit("DELETED_LOAD_ADDINFO_EASTCALENDAR", obj);

      // Notification using Socket
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldInfos.load.info,
        column: "Load",
        board: "East Calendar",
        title: "Load " + changedInfos.load.value + " info is deleted"
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, changedInfos: changedInfos});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/dragAndDrop", AuthenticateUser, async (req, res) => {
    try {
      const dragId = req.body.dragId;
      const dragTrucks = req.body.dragTrucks;
      const dropId = req.body.dropId;
      const dropTrucks = req.body.dropTrucks;
      const changedValue = req.body.changedValue;

      await EastWeeklyCalendar.findByIdAndUpdate(dragId, { trucks: dragTrucks });
      await EastWeeklyCalendar.findByIdAndUpdate(dropId, { trucks: dropTrucks });
      const dragCell = await EastWeeklyCalendar.findById(dragId);
      const dropCell = await EastWeeklyCalendar.findById(dropId);

      // Response using socket.io
      const obj = { dragCell: dragCell, dropCell: dropCell };
      io.emit("DRAG_AND_DROP_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: dragCell.load.value,
        newValue: dropCell.load.value,
        column: "Truck",
        board: "East Calendar",
        title: "Truck " + changedValue + " is draged and droped",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, dragCell: dragCell, dropCell: dropCell});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/updateTrucks", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;

      const oldTrucks = await EastWeeklyCalendar.findById(id);
      let oldInfosTrucks = [];
      oldTrucks.trucks.forEach((item)=>{
        oldInfosTrucks.push(item.value)
      })

      await EastWeeklyCalendar.findByIdAndUpdate(id, { trucks: trucks });
      const updatedTrucks = await EastWeeklyCalendar.findById(id);
      let newInfosTrucks = [];
      updatedTrucks.trucks.forEach((item)=>{
        newInfosTrucks.push(item.value)
      })

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("UPDATED_TRUCKS_EASTCALENDAR", obj);

      // Notification using Socket.io
      if (oldInfosTrucks.length === 0) {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: newInfosTrucks.toString(),
          column: "Truck",
          board: "East Calendar",
          title: "Truck is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: newInfosTrucks.toString(),
          prevValue: oldInfosTrucks.toString(),
          column: "Truck",
          board: "East Calendar",
          title: "Truck is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedTrucks: updatedTrucks});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/addTruckInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const truckInfo = req.body.truckInfo;

      const oldTrucks = await EastWeeklyCalendar.findById(id);
      const oldTrucksInfo = oldTrucks.trucks[0].info;
      let tempTrucks = oldTrucks.trucks;
      tempTrucks[0].info = truckInfo;

      await EastWeeklyCalendar.findByIdAndUpdate(id, { trucks: tempTrucks });
      const updatedTrucks = await EastWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("ADDED_TRUCKINFO_EASTCALENDAR", obj);

      // Notification using Socket.io
      if(oldTrucksInfo){
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedTrucks.trucks[0].info,
          prevValue: oldTrucksInfo,
          column: "Truck",
          board: "East Calendar",
          title: "Truck " + updatedTrucks.trucks[0].value + " info is changed"
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedTrucks.trucks[0].info,
          column: "Truck",
          board: "East Calendar",
          title: "Truck " + updatedTrucks.trucks[0].value + " info is added"
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }

      res.json({ status: true, updatedTrucks: updatedTrucks});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/addLoadInfo", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const LoadInfo = req.body.LoadInfo;

      const oldLoad = await EastWeeklyCalendar.findById(id);
      const oldLoadsInfo = oldLoad.load;
      let tempLoad = oldLoad.load;
      if(tempLoad?.info || tempLoad?.info === '') tempLoad.info = LoadInfo;

      if(!tempLoad?.value){
        res.json({ status: false, msg: "The Load already exists!"});
      }else{
        await EastWeeklyCalendar.findByIdAndUpdate(id, { load: tempLoad });
        const updatedLoad = await EastWeeklyCalendar.findById(id);

        // Response using socket.io
        const obj = { updatedLoad: updatedLoad };
        io.emit("ADDED_LOADINFO_EASTCALENDAR", obj);

        // Notification using Socket.io
        if(oldLoadsInfo){
          const actionlog = await Actionlogs.create({
            user: req.user.user,
            newValue: updatedLoad.load.info,
            prevValue: oldLoadsInfo.info,
            column: "Load",
            board: "East Calendar",
            title: "Load " + updatedLoad.load.value + " info is changed"
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        } else {
          const actionlog = await Actionlogs.create({
            user: req.user.user,
            newValue: updatedLoad.load.info,
            column: "Load",
            board: "East Calendar",
            title: "Load " + updatedLoad.load.value + " info is added"
          });
          io.emit("NEW_NOTIFICATION", actionlog);
        }

        res.json({ status: true, updatedLoad: updatedLoad});
      }
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/updateLoad", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      let load = req.body.load;
      const date = req.body.date;

      const oldLoad = await EastWeeklyCalendar.findById(id);
      if(load.value.length >= 7) {
        const tempString = load.value.slice(0,7);
        let days;
        if (date === 'current') days = getCurrentWeek();
        else days = getNextWeek();
        const datas = await EastWeeklyCalendar.find({'date': days});
        let i = 0;
        datas.forEach((data)=>{
          let judgeString;
          if(data.load) judgeString =  data.load.value?.slice(0,7);
          if(tempString === judgeString) i++;
        })
        if(oldLoad.load?.value?.slice(0,7) === tempString) i--;

        if(i > 0) load.duplicated = true;
        else load.duplicated = false;
      }
      await EastWeeklyCalendar.findByIdAndUpdate(id, { load: load });
      const updatedLoad = await EastWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedLoad: updatedLoad };
      io.emit("UPDATED_LOAD_EASTCALENDAR", obj);

      // Notification using Socket.io
      if (!oldLoad.load) {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedLoad.load.value,
          column: "Load",
          board: "East Calendar",
          title: "Load is added",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      } else {
        const actionlog = await Actionlogs.create({
          user: req.user.user,
          newValue: updatedLoad.load.value,
          prevValue: oldLoad.load.value,
          column: "Load",
          board: "East Calendar",
          title: "Load is changed",
        });
        io.emit("NEW_NOTIFICATION", actionlog);
      }


      res.json({ status: true, updatedLoad: updatedLoad});
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/changeTruckColor", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const trucks = req.body.trucks;
      const value = req.body.value;

      await EastWeeklyCalendar.findByIdAndUpdate(id, { trucks: trucks });
      const updatedTrucks = await EastWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedTrucks: updatedTrucks };
      io.emit("CHANEGED_TRUCK_COLOR_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: value,
        column: "Truck",
        board: "East Calendar",
        title: "Truck is ready",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, updatedTrucks: updatedTrucks });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/changeLoadColor", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      const load = req.body.load;

      await EastWeeklyCalendar.findByIdAndUpdate(id, { load: load });
      const updatedLoad = await EastWeeklyCalendar.findById(id);

      // Response using socket.io
      const obj = { updatedLoad: updatedLoad };
      io.emit("CHANEGED_LOAD_COLOR_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: load.value,
        column: "Load",
        board: "East Calendar",
        title: "Load is ready",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, updatedLoad: updatedLoad });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/editCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const note = req.body.text;

      const oldNote = await EastWeeklyCalendarText.findById(note._id);
      await EastWeeklyCalendarText.findByIdAndUpdate(note._id, { text: note.text });
      const calendarText = await EastWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("EDIT_CALENDAR_TEXT_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldNote.text,
        newValue: note.text,
        board: "East Calendar Notepad",
        title: "Note is changed",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/addCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const text = req.body.text;

      await EastWeeklyCalendarText.create({ text: text });
      const calendarText = await EastWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("ADD_CALENDAR_TEXT_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        newValue: text,
        board: "East Calendar Notepad",
        title: "Note is added",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  router.post("/eastCalendar/deleteCalendarText", AuthenticateUser, async (req, res) => {
    try {
      const id = req.body.id;
      
      const oldNote = await EastWeeklyCalendarText.findByIdAndDelete(id);
      const calendarText = await EastWeeklyCalendarText.find();
      
      // Response using socket.io
      const obj = { calendarText: calendarText };
      io.emit("DELETE_CALENDAR_TEXT_EASTCALENDAR", obj);

      // Notification using Socket.io
      const actionlog = await Actionlogs.create({
        user: req.user.user,
        prevValue: oldNote.text,
        board: "East Calendar Notepad",
        title: "Note is deleted",
      });
      io.emit("NEW_NOTIFICATION", actionlog);

      res.json({ status: true, calendarText: calendarText });
    } catch (error) {
      res.json({ status: false, msg: error.message });
    }
  });

  return router;
}

module.exports = SocketRouter;
