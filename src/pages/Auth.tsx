import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Lock, Building2, Home, Sparkles, ArrowRight, Loader2, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    accountType: 'client',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // Password strength calculation
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (formData.password.length >= 8) strength += 20;
    if (/[A-Z]/.test(formData.password)) strength += 20;
    if (/[0-9]/.test(formData.password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 20;
    if (formData.password.length >= 12) strength += 20;

    setPasswordStrength(strength);
  }, [formData.password]);

  // Form validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!isLogin) {
      if (!formData.name.trim()) {
        errors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Immediately navigate to dashboard without any checks
    navigate('/dashboard', { replace: true });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-red-500';
    if (passwordStrength < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-prohome-blue/10 to-prohome-green/10 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 space-y-8 bg-white shadow-xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-prohome-blue/10 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-prohome-blue" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-prohome-blue">
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Sign in to continue' : 'Join our community of professionals and clients'}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={`pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-prohome-blue focus:ring-prohome-blue/20 ${
                      validationErrors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {validationErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, accountType: value }))}
                  >
                    <SelectTrigger className="bg-white border-gray-200 text-gray-900 focus:border-prohome-blue focus:ring-prohome-blue/20">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="client" className="focus:bg-prohome-blue/5">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-prohome-blue" />
                          <span className="text-gray-900">Client</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="professional" className="focus:bg-prohome-blue/5">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-2 text-prohome-blue" />
                          <span className="text-gray-900">Professional</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-prohome-blue focus:ring-prohome-blue/20 ${
                  validationErrors.email ? 'border-red-500' : ''
                }`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>

            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={`w-full pl-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-prohome-blue focus:ring-prohome-blue/20 ${
                  validationErrors.password ? 'border-red-500' : ''
                }`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {!isLogin && formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Password Strength</span>
                    <span className={getPasswordStrengthColor().replace('bg-', 'text-')}>
                      {passwordStrength < 40 ? 'Weak' : passwordStrength < 70 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                  <Progress value={passwordStrength} className={getPasswordStrengthColor()} />
                </div>
              )}
              {validationErrors.password && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`w-full pl-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-prohome-blue focus:ring-prohome-blue/20 ${
                    validationErrors.confirmPassword ? 'border-red-500' : ''
                  }`}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {validationErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                )}
              </div>
            )}
          </div>

          <div>
            <Button
              type="submit"
              className="w-full group bg-prohome-blue hover:bg-prohome-blue/90 text-white"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full border-prohome-blue/20 hover:bg-prohome-blue/5 hover:border-prohome-blue/40 text-prohome-blue/80 hover:text-prohome-blue transition-colors">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="currentColor"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="currentColor"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="currentColor"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="currentColor"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="w-full border-prohome-blue/20 hover:bg-prohome-blue/5 hover:border-prohome-blue/40 text-prohome-blue/80 hover:text-prohome-blue transition-colors">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                  fill="currentColor"
                />
              </svg>
              GitHub
            </Button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium text-prohome-blue hover:text-prohome-blue/80 transition-colors"
            disabled={isLoading}
          >
            {isLogin ? (
              <span className="flex items-center justify-center">
                <User className="h-4 w-4 mr-2" />
                Need an account? Sign up
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <ArrowRight className="h-4 w-4 mr-2" />
                Already have an account? Sign in
              </span>
            )}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth; 