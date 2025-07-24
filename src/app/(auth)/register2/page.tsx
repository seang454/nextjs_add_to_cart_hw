'use client'

import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCreateFileMutation, useCreateUserMutation } from '@/lib/features/authApiSlice'
import { CreateUserDto } from '@/types/userType'

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

// file validation constants
const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
// const ACCEPTED_FILE_TYPES = ['image/jpeg', ['image/jpg'], 'image/png', 'application/pdf']
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']


const formSchema = z.object({
    name: z
        .string().min(8, {
            message: "Username are required.",
        }),
    email: z
        .string().email({
            message: "Invalid email address.",
        }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .regex(passwordRegex, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        })
        .regex(passwordRegex, {
            message: "Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }),
    avatar: z.union([
        z.instanceof(File)
            .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 1MB')
            .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), 'Only .jpeg .jpg, .png, .pdf files are allowed'),
        z.string().url({ message: 'Avatar must be a valid URL.' })
    ]),
})

type RegisterFormValues = z.infer<typeof formSchema>

export default function Register() {

    const [register, { isLoading }] = useCreateUserMutation()
    const [createFile] = useCreateFileMutation()
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            avatar: ''
        },
    })
    const onSubmit = async (data: RegisterFormValues) => {
        console.log('Submitted :', data)
        let avatarUrl = '';
        if (data.avatar) {
            if (data.avatar instanceof File) {
                const fileFormData = new FormData();
                fileFormData.append('file', data.avatar);
                try {
                    const fileResponse = await createFile(fileFormData).unwrap();
                    // If your backend returns the uploaded file URL, set avatarUrl here
                    avatarUrl = fileResponse.location;
                    console.log('File upload response:', fileResponse);
                } catch (error) {
                    console.error('File upload error:', error);
                }
            } else {
                avatarUrl = data.avatar;
            }
        }
        // Now register user, sending avatarUrl if available
        const registerData: CreateUserDto = {
            name: data.name,
            email: data.email,
            password: data.password,
            avatar: avatarUrl
        };
        try {
            const response = await register(registerData).unwrap();
            console.log('Register response:', response);
        } catch (error) {
            console.error('Register error:', error);
        }
        form.reset();
    }
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Card className="max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* username fields */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* email fields */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* password fields */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* confirm password fields */}
                        {/* <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        {/* File Upload */}
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field: { onChange, ref } }) => (
                                <FormItem>
                                    <FormLabel>Upload Avatar</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    onChange(e.target.files[0]);
                                                }
                                            }}
                                            ref={ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Register</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
