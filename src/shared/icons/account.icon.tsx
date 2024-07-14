import FaceIcon from '@mui/icons-material/Face';
import Face2Icon from '@mui/icons-material/Face2';
interface Props {
gender: string
sx?: any
className?: string
}
export const AccountIcon = ({gender, sx, className}: Props) => (
    gender === 'male' ? (
            <FaceIcon sx={sx} className={className}/>    
    ) : (
            <Face2Icon sx={sx}/>
    )
)