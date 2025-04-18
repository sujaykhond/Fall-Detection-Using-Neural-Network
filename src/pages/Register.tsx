
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, EyeOff, UserPlus, Github } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    // Simulate registration API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Account created successfully!');
      navigate('/login');
    }, 1000);
  };

  const handleGoogleSignup = () => {
    setSocialLoading('google');
    // Simulate Google OAuth registration
    setTimeout(() => {
      setSocialLoading(null);
      toast.success('Account created with Google!');
      navigate('/dashboard');
    }, 1500);
  };

  const handleGithubSignup = () => {
    setSocialLoading('github');
    // Simulate GitHub OAuth registration
    setTimeout(() => {
      setSocialLoading(null);
      toast.success('Account created with GitHub!');
      navigate('/dashboard');
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gradient-to-b from-detector-dark to-background">
      <Card className="w-full max-w-md glass-card border-border/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-detector-blue" />
          </div>
          <CardTitle className="text-2xl">Create Your Account</CardTitle>
          <CardDescription>
            Sign up to join the Fall Detector monitoring system
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button
                type="button"
                variant="outline"
                className="w-full glass hover:bg-white/20"
                onClick={handleGoogleSignup}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'google' ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                    <span>Signing up...</span>
                  </div>
                ) : (
                  <>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                    Google
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full glass hover:bg-white/20"
                onClick={handleGithubSignup}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'github' ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                    <span>Signing up...</span>
                  </div>
                ) : (
                  <>
                    <Github className="w-5 h-5 mr-2" />
                    Github
                  </>
                )}
              </Button>
            </div>
            
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-detector-darker border-border/20"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-detector-darker border-border/20"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-detector-darker border-border/20 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-detector-darker border-border/20"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button 
              type="submit" 
              className="w-full bg-detector-blue hover:bg-blue-600 text-white" 
              disabled={loading || socialLoading !== null}
            >
              {loading ? 'Creating Account...' : 'Register'}
              <UserPlus className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account? 
              <Link to="/login" className="ml-1 text-detector-blue hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
