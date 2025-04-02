import matplotlib.pyplot as plt
import os

# Ensure the "images" folder exists
if not os.path.exists('images'):
    os.makedirs('images')

def plot_line_graph_save_as_image(heights, game_id):
    plt.plot(heights, marker='o')
    plt.title(f'Height Values Line Graph for game {game_id}')
    plt.xlabel('Index')
    plt.ylabel('Height')
    plt.grid(True)

    # Save the plot to the "images" folder
    image_path = str(f'images/game_{game_id}_graph.png')
    plt.savefig(image_path)
    plt.close()

    return image_path

# Test with small data
heights = [1, 2, 3, 4, 5]
image_path = plot_line_graph_save_as_image(heights, 1)
print(f"Graph saved at: {image_path}")