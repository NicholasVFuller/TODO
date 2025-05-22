using System.ComponentModel.DataAnnotations.Schema;

public class TodoItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsComplete { get; set; }
    public long? CompletedAt { get; set; }
    public int OrderNum { get; set; }
}