interface UserAvatarProps {
  name: string
  size?: number // ukuran diameter dalam pixel
}

export default function UserAvatar({ name, size = 32 }: UserAvatarProps) {
  const initial = name.charAt(0).toUpperCase()

  const sizeStyle = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size / 2}px`,
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-semibold"
        style={sizeStyle}
      >
        {initial}
      </div>
    </div>
  )
}
