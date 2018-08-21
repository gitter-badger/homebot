import mongoose from 'mongoose';
import response from '../helpers/response';
import request from '../helpers/request';
import pagination from '../helpers/pagination';

const Device = mongoose.model('Device');

exports.list = function(req, res) {
  if (!req.currentUser.canRead(req.locals.user)) return response.sendForbidden(res);
  const query = Object.assign({ owner: req.params.userId }, request.getFilteringOptions(req, ['name']));
  Device.paginate(query, request.getRequestOptions(req), function(err, result) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, result);
    res.json(result.docs);
  });
};

exports.create = function(req, res) {
    const user = req.locals.user;
    if (!req.currentUser.canEdit(user)) return response.sendForbidden(res);
    const device = new Device(req.body);
    device.owner = user;
    device.save(function(err, device) {
      if (err) return response.sendBadRequest(res, err);

      user.devices.push(device);
      user.save(function(err, user) {
        if (err) return response.sendBadRequest(res, err);
        response.sendCreated(res, device);
      });
    });
};

exports.read = function(req, res) {
  Device.findById(req.params.id, function(err, Device) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canRead(Device)) return response.sendForbidden(res);
    res.json(Device);
  });
};

exports.update = function(req, res) {
  Device.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, Device) {
    if (err) return response.sendBadRequest(res, err);
    if (!req.currentUser.canEdit(Device)) return response.sendForbidden(res);
    res.json(Device);
  });
};

exports.delete = function(req, res) {
  Device.remove({ _id: req.params.id }, function(err, Device) {
    if (err) return response.sendNotFound(res);
    if (!req.currentUser.canEdit(Device)) return response.sendForbidden(res);
    res.json({ message: 'Device successfully deleted' });
  });
};
