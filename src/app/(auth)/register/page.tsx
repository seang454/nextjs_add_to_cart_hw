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

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

// file validation constants
const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB
// const ACCEPTED_FILE_TYPES = ['image/jpeg', ['image/jpg'], 'image/png', 'application/pdf']
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']


const formSchema = z.object({
    username: z
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
        }),
    confirmPassword: z
        .string()
        .min(8, {
            message: "Confirm Password must be at least 8 characters.",
        })
        .regex(passwordRegex, {
            message: "Confirm Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        }),
    file: z
        .any()
        .refine((file) => file instanceof File, 'File is required')
        .refine((file) => file?.size <= MAX_FILE_SIZE, 'Max file size is 2MB')
        .refine(
            (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
            'Only .jpeg .jpg, .png, .pdf files are allowed'
        ),
})

type RegisterFormValues = z.infer<typeof formSchema>

export default function Register() {

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: RegisterFormValues) => {
        console.log('Submitted:', data)
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
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
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
                        <FormField
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
                        />

                        {/* File Upload */}
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field: { onChange, ref } }) => (
                                <FormItem>
                                    <FormLabel>Upload File</FormLabel>
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
