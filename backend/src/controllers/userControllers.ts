import { Request, Response } from "express";
import { signInBody, signupBody } from "../zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

interface SignupType {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const userSignup = async (req: Request, res: Response) => {

    try {
        const { firstName, lastName, email, password }: SignupType = req.body;

        // Check for required fields
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({
                message: "Please send all the fields",
                success: false
            })
            return;
        }

        // Validating user inputs using zod
        const { success } = signupBody.safeParse(req.body);

        if (!success) {
            res.status(400).json({
                message: 'Wrong Input types',
                success: false
            })
            return;
        }

        //generating salt and hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //saving user in database
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                password: hashedPassword,
                email
            }
        })

        //generating token using JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: "30d"
        });

        const newUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        res.status(201).json({
            message: 'User registered Successfully',
            success: true,
            token,
            newUser
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in registering user!', success: false })
    }
}

type SignInType = Partial<SignupType>;

export const userSignIn = async (req: Request, res: Response) => {
    try {

        const { email, password }: SignInType = req.body;

        //check for required field
        if (!email || !password) {
            res.status(400).json({
                message: "Please send all the fields",
                success: false
            })
            return;
        }

        const { success } = signInBody.safeParse(req.body);

        if (!success) {
            res.status(400).json({
                message: 'Wrong Input types',
                success: false
            })
            return;
        }

        // checking if user exist or not
        const userExist = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!userExist) {
            res.status(400).json({
                message: 'User not found',
                success: false
            })
            return;
        }

        // checking if the password are correct
        const comparePassword = await bcrypt.compare(password, userExist?.password as string)

        if (!comparePassword) {
            res.status(400).json({
                message: 'Wrong credentials',
                success: false
            })
            return;
        }


        // generating token using JWT
        const token = jwt.sign({ id: userExist?.id }, process.env.JWT_SECRET as string, {
            expiresIn: "30d"
        });


        const newUser = {
            id: userExist.id,
            firstName: userExist.firstName,
            lastName: userExist.lastName,
            email: userExist.email
        }

        res.status(200).json({
            message: `Welcome back ${userExist.firstName}`,
            success: true,
            token,
            newUser
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in login user!', success: false })
    }
}

export const userLogout = (req: Request, res: Response) => {
    try {
        res.status(200).json({
            message: 'User Logged Out Successfully!',
            success: true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error in logging out User',
            success: false
        })
    }
}

