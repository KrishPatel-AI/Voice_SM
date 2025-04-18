import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mic, Globe, Mail, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
            <div className="container px-4 py-12">
                <div className="grid gap-10 lg:grid-cols-4 sm:grid-cols-2">
                    <div className="space-y-4">
                        <Link href="/" className="text-xl font-bold">
                            <span className="text-primary">Voice</span>SM
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-sm">
                            Get real-time market insights, stock analysis, and financial
                            advice through natural conversation. Powered by Groq and Fluvio.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Products</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Market Analysis
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Voice Assistant
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary">
                                    Compare Stocks
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                support@voicesm.com
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                +91 ***** *****
                            </li>
                            <li className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                www.voicesm.com
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Get Started Now</h3>
                        <p className="text-sm text-muted-foreground">
                            Ask anything to our AI powered voice assistant related to finance.
                        </p>
                        <div className="flex w-full gap-2">
                            <Link href="/voice-assistant">
                                <Button size="lg" className="gap-2">
                                    <Mic className="h-4 w-4" />
                                    Try Voice Assistant
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
                    <span>© 2025 VoiceSM. All rights reserved.</span>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <Link href="#" className="hover:text-primary">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="hover:text-primary">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
