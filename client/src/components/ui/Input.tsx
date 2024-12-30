import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Props = {
  name: string;
  type: string;
  id: string;
  value?: string;
  placeholder: string;
  Icon: LucideIcon;
};

function Input({ name, type, id, value, placeholder, Icon }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative mb-4 w-[100%]">
      <input
        name={name}
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={placeholder}
        id={id}
        defaultValue={value}
        className="input-box"
      />
      <Icon className="input-icon p-[2px]" />
      {type === 'password' && (
        <div
          className="input-icon left-auto right-4 flex cursor-pointer flex-col items-center justify-center"
          onClick={() => setShowPassword((s) => !s)}
        >
          {showPassword ? (
            <>
              <Eye className="mt-2 size-5" />
              <span className="text-xs pointer-events-none text-black/80">
                Hide
              </span>
            </>
          ) : (
            <>
              <EyeClosed className="mt-2 size-5" />
              <span className="text-xs pointer-events-none text-black/80">
                Show
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Input;
