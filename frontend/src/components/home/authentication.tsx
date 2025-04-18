import {
  Lock,
  UserCheck,
  RefreshCw,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Authentication() {
  const features = [
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Secure Authentication",
      description:
        "Bank-grade authentication with encryption, OTP, and reCAPTCHA for enhanced safety.",
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: "Full Profile Control",
      description:
        "Easily update profile info, set passwords, manage devices, and more from your dashboard.",
    },
    {
      icon: <RefreshCw className="h-10 w-10 text-primary" />,
      title: "Seamless Experience",
      description:
        "Lightning-fast login, logout, password reset, and session management – no reloads required.",
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Multi-Provider Login",
      description:
        "Sign in with Google or email. Add multiple emails, manage accounts, or delete anytime.",
    },
  ];

  return (
    <section className="p-12 bg-accent/50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Secure, Fast and Seamless Authentication
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
          VoiceSM provide authentication system ensures a fast, secure, and seamless sign-in experience. 
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
