/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
const { validationResult } = require('express-validator');
const { getPaiganation } = require('u-server-utils');
const { Types } = require('mongoose');
const { User } = require('../model');
const errors = require('../util/errors');
const { makeRequest } = require('../util/kafka/client');

const allUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

const getAllUsers = async (req, res) => {
  const whereOpts = [];

  const orQuery = [];
  if (q && q != '') {
    orQuery.push({ name: { $regex: `(?i)(?<= |^)${q}(?= |$)` } });
    orQuery.push({ description: { $regex: `(?i)(?<= |^)${q}(?= |$)` } });
  }

  orQuery.length && whereOpts.push({ $or: orQuery });

  let query = {};
  if (whereOpts.length > 0) {
    query = { $and: whereOpts };
  }

  const { limit, offset } = getPaiganation(req.query.page, req.query.limit);

  const userCount = await User.count(query).skip(offset).limit(limit);
  const users = await User.find(
    { $match: query })
    .skip(offset)
    .limit(limit);

  res.status(200).json({ total: userCount, nodes: users });
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json(errors.badRequest);
    return;
  }

  try {
    const users = await User.aggregate([
      { $match: { _id: Types.ObjectId(id) } },
      {
        // $lookup: {
        //   from: 'dishes',
        //   localField: 'dishes',
        //   foreignField: '_id',
        //   as: 'dishes',
        // },
      },
    ]);
    if (!users || userss?.length < 1) {
      res.status(404).send(errors.notFound);
      return;
    }

    res.status(200).json(users[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json(errors.serverError);
  }
};

const createUser = async (req, res) => {
  const { user } = req.headers;
  if (user !== req.body.id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'user.id in body should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const userBody = req.body;
  userBody._id = userBody.id;

  makeRequest('user.create', userBody, async (err, resp) => {
    if (err || !resp) {
      res.status(500).json(errors.serverError);
      return;
    }
    const result = await User.aggregate([
      { $match: { _id: Types.ObjectId(resp._id) } },
      {
        
      },
    ]);

    res.status(201).json(result[0]);
  });
};

const updateUserByID = async (req, res) => {
  const { id } = req.params;
  if (!id || id == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const { user } = req.headers;
  if (user != id) {
    res.status(400).json({
      ...errors.badRequest,
      message: 'id should be same as logged in user',
    });
    return;
  }

  const valErr = validationResult(req);
  if (!valErr.isEmpty()) {
    console.error(valErr);
    res.status(400).json({ status: 400, message: valErr.array() });
    return;
  }

  const userBody = req.body;
  if (!userBody.media || userBody.media?.length == 0) {
    userBody.media = [];
  }

  const dbRes = await User.findOne({ _id: id });
  if (!dbRes) {
    res.status(404).json(errors.notFound);
    return;
  }

  makeRequest('user.update', { id: dbRes._id, data: userBody }, async (err, resp) => {
    if (err || !resp) {
      res.status(500).json(errors.serverError);
      return;
    }
    const result = await User.aggregate([
      { $match: { _id: Types.ObjectId(resp._id) } },
      {

      },
    ]);

    res.status(200).json(result[0]);
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id || id == 0) {
    res.status(400).json(errors.badRequest);
    return;
  }

  const userBody = await User.findOne({ _id: Types.ObjectId(id) });
  if (!userBody) {
    res.status(404).send(errors.notFound);
    return;
  }

  makeRequest('user.delete', { id: userBody._id }, async (err, resp) => {
    if (err || !resp) {
      res.status(500).json(errors.serverError);
      return;
    }
    if (resp.success) {
      res.status(200).json(null);
    } else {
      res.status(500).json(errors.serverError);
    }
  });
};

module.exports = {
  allUsers,
  getAllUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUser,
};
