import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {Logo} from "./header/Logo";
import { SignInAction } from "@/actions/authentication";
import { Button } from "./ui/button";

const NoAccess = ({
  details = "Log in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string;
}) => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md p-5">

        {/* Card header with logo and title */}
        <CardHeader className="flex items-center flex-col">
          <Logo />
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </CardTitle>
        </CardHeader>

        {/*content with details and sign-in button */}
        <CardContent className="space-y-4">
          <p className="text-center font-medium text-[#151515]/80">{details}</p>
          <form action={SignInAction}>
            <Button className="w-full bg-[#038354] hover:bg-[#063d29] text-white" size="lg">
              Sign in
            </Button>
          </form>
        </CardContent>

        {/* Footer with sign-up button */}
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don&rsquo;t have an account?
          </div>
          
            <Button variant="outline" className="w-full" size="lg">
              Create an account
            </Button>
         
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;