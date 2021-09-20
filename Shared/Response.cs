/// <summary>
/// Class that helps structure json response
/// </summary>
/// <typeparam name="T">Type of data in response</typeparam>
public class Response<T>
{
    /// <summary>
    /// data passed to response
    /// </summary>
    public T data { get; set; }
    /// <summary>
    /// message sent
    /// </summary>
    public string message { get; set; }
}