"use client"
import { login } from "@/apis/login"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const [teacherID, setTeacherID] = useState(null);
  const [teacherPass, setTeacherPass] = useState(null);
  const [enroll, setEnroll] = useState(null);
  const [studentPass, setStudentPass] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const router = useRouter();


  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: teacherID,
      password: teacherPass,
      type: 1
    }
    const res = await login(data);
    if(res.success){
      localStorage.setItem('uid', res.uid);
      router.push('/teacher/dashboard');
    }
    else{
      setInvalid(true);
    }
  }
  
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    console.log(enroll, studentPass);
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-5">
      <Tabs defaultValue="teacher" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teacher">Teacher</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
        </TabsList>
        <TabsContent value="teacher">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <form onSubmit={handleTeacherSubmit}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="userid">User ID</Label>
                  <Input id="name" placeholder="Enter your Id" onChange={(e) => setTeacherID(e.target.value)}/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="TeacherPassword" placeholder="Enter password" onChange={(e) => setTeacherPass(e.target.value)}/>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <form onSubmit={handleStudentSubmit}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="enroll">Enrollment Number</Label>
                  <Input id="ernoll" type="number" placeholder="Enter your enrollment number" onChange={(e) => setEnroll(e.target.value)}/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="studentPassword" type="password" placeholder="Enter password" onChange={(e) => setStudentPass(e.target.value)}/>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      {invalid && (
        <div className="bg-red-300 p-2 w-96 text-center">
          <h2 className="">Invalid credentials!</h2>
        </div>
      )}
    </div>
  );
}