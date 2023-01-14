namespace GroupchatAPI.Models
{
    public class CreateGroupDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int AdminId { get; set; }
        public int[] UserIds { get; set; }
        public int[]? MessageIds { get; set; }
    }
}
