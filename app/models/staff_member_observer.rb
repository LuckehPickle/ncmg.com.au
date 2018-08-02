class StaffMemberObserver < ActiveRecord::Observer
  def before_update(record)
    if record.encrypted_password_changed? && !record.password_changed?
      record.password_changed = true
    end
  end
end
