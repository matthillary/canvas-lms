class AddWasPreviewToQuizSubmission < ActiveRecord::Migration[4.2]
  tag :predeploy

  def self.up
    add_column 'quiz_submissions', 'was_preview', :boolean
  end

  def self.down
    remove_column 'quiz_submissions', 'was_preview'
  end
end

