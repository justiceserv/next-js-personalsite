import { Twitter, Facebook, Link as LinkIcon, X, Check } from "lucide-react"
import { useState } from "react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  url: string
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, url }) => {
  const [copiedLink, setCopiedLink] = useState(false)

  if (!isOpen) return null

  const shareOptions = [
    {
      name: "Twitter",
      icon: Twitter,
      onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank'),
      className: "hover:bg-blue-500/10 hover:text-blue-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'),
      className: "hover:bg-indigo-500/10 hover:text-indigo-400",
    },
    {
      name: copiedLink ? "Copied!" : "Copy Link",
      icon: copiedLink ? Check : LinkIcon,
      onClick: async () => {
        await navigator.clipboard.writeText(url)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
      },
      className: copiedLink 
        ? "bg-green-500/10 text-green-400" 
        : "hover:bg-zinc-700/50 hover:text-zinc-300",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-zinc-950 rounded-xl shadow-2xl max-w-sm w-full border border-zinc-800/50">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
          <h3 className="text-lg font-medium text-zinc-200">Share This Post</h3>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.onClick}
              className={`w-full flex items-center gap-3 p-4 rounded-lg text-zinc-400 
                transition-all duration-200 bg-zinc-900/50 border border-zinc-800/50
                hover:border-zinc-700 ${option.className}`}
            >
              <option.icon className="w-5 h-5" />
              <span className="font-medium">{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShareModal 