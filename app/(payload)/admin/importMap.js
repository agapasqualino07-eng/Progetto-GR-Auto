import { PriceCell } from '@/lib/payload/admin/components/cells/PriceCell'
import { MileageCell } from '@/lib/payload/admin/components/cells/MileageCell'
import { RegistrationCell } from '@/lib/payload/admin/components/cells/RegistrationCell'
import { StatusBadgeCell } from '@/lib/payload/admin/components/cells/StatusBadgeCell'
import { FeaturedCell } from '@/lib/payload/admin/components/cells/FeaturedCell'
import { ThumbnailCell } from '@/lib/payload/admin/components/cells/ThumbnailCell'
import { DuplicateVehicleButton } from '@/lib/payload/admin/components/DuplicateVehicleButton'
import { BulkUpdateStatus } from '@/lib/payload/admin/components/BulkUpdateStatus'
import { AdminDashboard } from '@/lib/payload/admin/components/Dashboard'

export const importMap = {
  '@/lib/payload/admin/components/cells/PriceCell#PriceCell': PriceCell,
  '@/lib/payload/admin/components/cells/MileageCell#MileageCell': MileageCell,
  '@/lib/payload/admin/components/cells/RegistrationCell#RegistrationCell':
    RegistrationCell,
  '@/lib/payload/admin/components/cells/StatusBadgeCell#StatusBadgeCell':
    StatusBadgeCell,
  '@/lib/payload/admin/components/cells/FeaturedCell#FeaturedCell':
    FeaturedCell,
  '@/lib/payload/admin/components/cells/ThumbnailCell#ThumbnailCell':
    ThumbnailCell,
  '@/lib/payload/admin/components/DuplicateVehicleButton#DuplicateVehicleButton':
    DuplicateVehicleButton,
  '@/lib/payload/admin/components/BulkUpdateStatus#BulkUpdateStatus':
    BulkUpdateStatus,
  '@/lib/payload/admin/components/Dashboard#AdminDashboard': AdminDashboard,
}
