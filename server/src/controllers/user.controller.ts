import { Request, Response } from 'express';
import { User, UserInput } from '../models/user.model';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
	const user = req.body;

	const takenUsername = await User.findOne({ username: user.username })
	const takenEmail = await User.findOne({ email: user.email })

	if (takenUsername || takenEmail) {
		res.status(200).send({ message: 'Username or email has already been taken' })
	} else {
		user.password = await bcrypt.hash(req.body.password, 10)

		const dbUser = new User({
			username: user.username,
			email: user.email.toLowerCase(),
			password: user.password
		})

		dbUser.save();
		res.status(200).send({ message: 'Success' })
	}
}
export const loginUser = async (req: Request, res: Response) => {
	const userLoggingIn = req.body;

	User.findOne({ username: userLoggingIn.username })
		.then(dbUser => {
			if (!dbUser) {
				return res.send({ message: 'Invalid Username or Password!' })
			}
			bcrypt.compare(userLoggingIn.password, dbUser.password)
				.then(isCorrect => {
					if (isCorrect) {
						const payload = {
							id: dbUser._id,
							username: dbUser.username
						}
						jwt.sign(
							payload,
							encodeURIComponent(process.env.JWT_SECRET || ''),
							{ expiresIn: 86400 },
							(err, token) => {
								if (err) return res.send({ message: err })
								return res.send({
									message: 'Success',
									token: "Bearer " + token
								})
							}
						)
					} else {
						return res.send({ message: 'Invalid Username or Password!' });
					}
				})
		})


}
