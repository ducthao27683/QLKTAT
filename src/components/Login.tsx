import React, { useState } from 'react';
import { EvnLogo } from './EvnLogo';
import { User, Eye, EyeOff, Apple, MonitorSmartphone } from 'lucide-react';
import { bgImage, bgLoginImage } from '../assets/images';

interface LoginProps {
  onLogin: () => void;
}

export const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('hungyenpc\\chiennv');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#F5F5F5]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url("${bgLoginImage}")` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Login Form Container */}
      <div className="z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/70 border border-white/40 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <EvnLogo className="w-20 h-20 mb-4" />
          <h1 className="text-[#164399] text-2xl font-bold tracking-wider">QLKT-AT-MT</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-gray-800 text-sm font-medium ml-1">Tên đăng nhập</label>
            <div className="relative">
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-4 text-gray-800 focus:border-[#164399] focus:ring-1 focus:ring-[#164399] outline-none shadow-sm transition-colors"
                placeholder="Nhập tên đăng nhập"
              />
              <User className="absolute right-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-gray-800 text-sm font-medium ml-1">Mật khẩu</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md py-2.5 px-4 text-gray-800 focus:border-[#164399] focus:ring-1 focus:ring-[#164399] outline-none shadow-sm transition-colors"
                placeholder="Nhập mật khẩu"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#164399] hover:bg-[#313193] text-white font-bold py-3 rounded-full transition-colors mt-4 shadow-lg"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gray-400 flex-1"></div>
            <span className="text-gray-600 text-sm">Lấy mã QR để quét</span>
            <div className="h-px bg-gray-400 flex-1"></div>
          </div>

          <div className="flex gap-4 justify-center mb-6">
            <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex-1 transition-colors">
              <Apple className="w-6 h-6" />
              <div className="text-left leading-tight">
                <div className="text-[10px] font-bold">DOWNLOAD</div>
                <div className="text-[9px]">ios 12 trở lên</div>
              </div>
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#00a8ff] hover:bg-blue-500 text-white py-2 px-4 rounded-md flex-1 transition-colors">
              <MonitorSmartphone className="w-6 h-6" />
              <div className="text-left leading-tight">
                <div className="text-[10px] font-bold">DOWNLOAD</div>
                <div className="text-[9px]">Android 7.0 trở lên</div>
              </div>
            </button>
          </div>

          <div className="flex justify-between text-gray-700 text-sm">
            <a href="#" className="hover:underline">Quên mật khẩu</a>
            <a href="#" className="hover:underline">Đổi mật khẩu</a>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="absolute bottom-4 text-white/70 text-sm text-center w-full z-10">
        <p>EvnTemplate build 25/6/2024</p>
        <p>Copyright by EVN - Developed by EVNICT</p>
      </div>
    </div>
  );
};
