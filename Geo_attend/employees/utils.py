import math

def is_within_geofence(user_coords, location):
    """
    user_coords: (lat, lon) in degrees
    location: a Location instance with .latitude, .longitude, .radius (in kilometers)
    """

    # Convert degrees to radians
    lat1 = math.radians(location.latitude)
    lon1 = math.radians(location.longitude)
    lat2 = math.radians(user_coords[0])
    lon2 = math.radians(user_coords[1])

    # Earth's radius in kilometers
    R = 6371

    # Spherical Law of Cosines
    distance = R * math.acos(
        math.sin(lat1) * math.sin(lat2) +
        math.cos(lat1) * math.cos(lat2) * math.cos(lon2 - lon1)
    )

    print("Distance in km:", distance)
    return distance <= location.radius
