import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
  type: String,
  name: String,
  where: String,
  image:{
    origUrl: String,
    alisa_id: String
  },
  payload: {},  
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Item', DeviceSchema);