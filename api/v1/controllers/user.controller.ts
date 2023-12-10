import {Request, Response} from 'express';
import md5 from 'md5';

import User from '../../../models/user.model';
import * as generateHelper from '../../../helpers/generate';

export const register = async (req: Request, res: Response) => {
  try {

    const existEmail = await User.findOne({ 
      email: req.body.email,
      deleted: false
    });

    if(existEmail){
      res.json({
        code: 400,
        message: "Email đã tồn tại !"
      });
      return;
    }
    const newUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: md5(req.body.password),
      token: generateHelper.generateString(30)
    }

    const user = new User(newUser);
    const data = await user.save();
    const token = data.token;

    res.cookie("token", token);
    res.json({
      code: 200,
      message: "Đăng kí thành công !",
      data: data
    });
  } catch(error){
    res.json({
      code: 400,
      message: "Lỗi !"
    });
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      deleted: false
    });

    if(!user){
      res.json({
        code: 400,
        message: "Lỗi !"
      });
      return;
    }

    if(md5(req.body.password) != user.password){
      res.json({
        code: 400,
        message: "Sai mật khẩu !"
      });
      return;
    }

    const token = user.token;

    res.json({
      code: 200,
      message: "Đăng kí thành công !",
      token: token
    });
  } catch (error){
    res.json({
      code: 400,
      message: "Lỗi !"
    });
    return;
  }
}

export const detail = async (req: Request, res: Response) => {
  try {
    res.json({
      code: 200,
      message: "Thành công !",
      user: req["infoUser"]
    });
  } catch(error){
    res.json({
      code: 400,
      message: "Lỗi !"
    })
  }
}