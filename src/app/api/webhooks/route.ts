import {Webhook} from 'svix';
import {headers} from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server';
import User from '@/app/Models/UserSchema';
import connect from '@/app/lib/connect';

export async function POST(req: Request){
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    console.log("📩 Webhook triggered");

    if(!WEBHOOK_SECRET) {
        return new Response('Webhook secret not configured', { status: 500 });
    }

    const headerPayload = headers();
    const svix_id = (await headerPayload).get('svix-id');
    const svix_timestamp = (await headerPayload).get('svix-timestamp');
    const svix_signature = (await headerPayload).get('svix-signature');

    if(!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Missing required headers - no svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try{
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
    }) as WebhookEvent;
    } catch (error) {  
        console.error('Webhook verification failed:', error);
        return new Response('Invalid webhook signature', { status: 400 });
    }

    const {id} = evt.data;
    const eventType = evt.type;

    if(eventType === "user.created"){
        const {id,email_addresses} = evt.data;

        const newUser = {
            clerkUserId: id,
            email_addresses: email_addresses[0].email_address
        };

        try {
            await connect();
            await User.create(newUser);
            console.log("User Created");
            
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    console.log(`Webhook event received: ${eventType} for user ID: ${id}`);
    console.log("Webhook body:", body);
    
    return new Response('Webhook received successfully', { status: 200 });

}