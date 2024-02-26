import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  authentication: {
    password: {type: String, required: true, select: false},
    salt: {type: String, select: false},
    sessionToken: {type: String, select: false},
  },
});

export const UserModel = mongoose.model('User', UserSchema);

// User Actions
export const getUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({email});
    return user;
  } catch (error) {
    console.error(`Error catching user by email ${email}:`, error);
    throw error;
  }
}

export const getUserBySessionToken = async (sessionToken: string) => {
  try {
    const user = await UserModel.findOne({'authentication.sessionToken': sessionToken});
  } catch (error) {
    console.error(`Error catching user by session ${sessionToken}:`, error);
    throw error;
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.error('Error fetching ID ${id}', error);
    throw error;
  }
}

export const createUser = async (values: Record<string, any>) => {
  try {
    const user = await new UserModel(values).save();
    return user.toObject();
  } catch (error) {
    console.error('Error creating user', error);
    throw error;
  }
}
export const deleteUserById = async (id: string) => {
  try {
   const deletedUser = await UserModel.findOneAndDelete({_id: id});
   return deletedUser;
  } catch (error) {
    console.error('Error deleting user ${id}', error);
    throw error;
  }
}
export const updateUserById = async (id: string, values: Record<string, any>) => {
  try {
    const updatedUser = await  UserModel.findByIdAndUpdate(id, values, {new: true});
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user by ID ${id}:`, error);
    throw error;
  }
}
