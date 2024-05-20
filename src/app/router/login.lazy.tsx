import {createLazyFileRoute} from '@tanstack/react-router'
import Login from "@/pages/login.tsx";

export const Route = createLazyFileRoute('/login')({
	component: Login
})
