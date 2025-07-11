import UserModel from "@/model/user.model";
import dbConnect from "@/lib/dbConnect";
import { Message } from "@/model/user.model";

export async function POST(request: Request) {
    await dbConnect();

    const { username, content } = await request.json();

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User not found'
                }, { status: 404 }
            )
        }

        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: 'User is not accepting messages'
                }, { status: 403 }
            )
        };

        const newMessage = { content, createdAt: new Date() };

        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json(
            {
                success: true,
                message: 'Message sent successfully'
            }, { status: 201 }
        )
    } catch (error) {
        console.error("Unable to send message", error);
        return Response.json(
            {
                success: false,
                message: 'Unable to send message'
            }, { status: 500 }
        )
    }
}

