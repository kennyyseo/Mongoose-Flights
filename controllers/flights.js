const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  delete: deleteFlight,
  edit,
  update,
};

function index(req, res) {
  Flight.find({}, function (err, flights) {
    res.render("flights/index", { title: "All Flights", flights });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({}, function (err, tickets) {
      const newFlight = new Flight();
      const dt = newFlight.departs;
      const arrDate = dt.toISOString().slice(0, 16);
      res.render("flights/show", {
        tickets,
        title: "Flight Details",
        flight,
        arrDate,
      });
    });
  });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  const departsDate = dt.toISOString().slice(0, 16);
  res.render("flights/new", { departsDate });
}

function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) res.render("/flights/new");
    res.redirect("/flights");
  });
}

function deleteFlight(req, res) {
  console.log("I'm in the delete Function!");
  Flight.findByIdAndDelete(req.params.id, function (err) {
    if (err) console.log("Error in deleteFlight function");
    res.redirect("/flights");
  });
}

function edit(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if (err) {
      res.redirect(`/flights/${req.params.id}`);
    }
    res.render("flights/edit", {
      flight,
      title: "Edit Flight",
      flightDeparts: flight.departs.toISOString().slice(0, 16),
    });
  });
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
    err,
    flight
  ) {
    if (err) {
      res.render("flights/edit", {
        flight,
        title: "Edit Flight",
        flightDeparts: flight.departs.toISOString().slice(0, 16),
      });
    }
    res.redirect(`flights`);
  });
}
