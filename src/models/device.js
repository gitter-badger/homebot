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
  }
});

DeviceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Device', DeviceSchema);
