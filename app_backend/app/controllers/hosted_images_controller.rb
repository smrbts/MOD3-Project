class HostedImagesController < ApplicationController

  def sprite_circle
    send_file 'public/sprites/circle.png', type: 'image/png', disposition: 'inline'
  end

end
